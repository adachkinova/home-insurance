import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {catchError, EMPTY, of} from 'rxjs';
import {ClaimService} from 'src/app/services/claim.service';
import {sharedService} from 'src/app/services/sharedService.service';
import {SuccessfulClaimComponent} from '../successful-claim/successful-claim.component';
import {Router} from '@angular/router';
import * as claimData from 'src/app/services/claim-data';
import {ValidatorService} from "angular-iban";

@Component({
  selector: 'app-new-claim',
  templateUrl: './new-claim.component.html',
  styleUrls: ['./new-claim.component.css']
})
export class NewClaimComponent implements OnInit, AfterViewInit {
  claimData: any;
  form ;
  categories ;
  types ;
  // selectedFiles : any = [];
  userInformation  = [];
  coveragePackage = 'OPTIMAL';
  coverageRisks : string[];
  damageCauses: string[] = [];
  lossDescriptions: string[] = [];
  public standardCoverage = claimData.standardCoverage;
  public optimalCoverage = claimData.optimalCoverage;
  public maximumCoverage = claimData.maximumCoverage;
  public causes_of_damage_by_claim_type = claimData.causesOfDamageByClaimType;
  public loss_descriptions_by_claim_type = claimData.lossDescriptionsByClaimType;
  imagePreviews;


  setCoverageRisks() {
    switch (this.coveragePackage) {
      case 'STANDART':
        this.coverageRisks = this.standardCoverage;
        break;
      case 'OPTIMAL':
        this.coverageRisks = [...this.standardCoverage, ...this.optimalCoverage];
        break;
      case 'MAXIMUM':
        this.coverageRisks = [...this.standardCoverage, ...this.optimalCoverage, ...this.maximumCoverage];
        break;
      default:
        this.coverageRisks = [];
    }
  }

  constructor(public dialog: MatDialog, public claimsService:ClaimService,
              private router: Router,
              private sharedService: sharedService) { }

  ngOnInit(): void {
    this.setCoverageRisks();
    this.userInformation=[];
    this.form = new FormGroup({
      assetType: new FormControl ("", Validators.required),
      event: new FormControl ("", Validators.required),
      damageCause: new FormControl ("", Validators.required),
      lossDescription: new FormControl ("", Validators.required),
      damageLevel: new FormControl ("", Validators.required),
      descriptionInput: new FormControl ("", Validators.required),
      iban: new FormControl ("", {validators:[Validators.required, ValidatorService.validateIban]}),
      claimDate: new FormControl ("", Validators.required),
      egn: new FormControl ("", Validators.required),
      images: new FormControl ("", Validators.required)
    })
  }

  onEventChange(event: any) {
    const eventType = event.value;
    this.damageCauses = this.causes_of_damage_by_claim_type[eventType] || [];
    this.lossDescriptions = this.loss_descriptions_by_claim_type[eventType] || [];
  }

  updatedFiles(event: any) {
    const files = event.files || event.target.files;

    if (!files || files.length === 0) {
      this.form.controls.images.setValue([]);
      console.log("No files selected");
      return;
    }

    const selectedFiles: File[] = [];
    Array.from(files).forEach((file: File) => {
      selectedFiles.push(file);  // Ensure files are added correctly to selectedFiles
    });

    console.log("Files selected:", selectedFiles);
    this.form.controls.images.setValue(selectedFiles);
  }


  getTypes(index ){
    this.types = this.categories[index-1].typeList
  }

  sendNewClaim() {
    this.sharedService.isLoading(true);
    this.form.controls.claimDate.setValue(new Date());

    const egn = sessionStorage.getItem('InsurerData');
    this.form.controls.egn.setValue(egn);

    // Step 1: Upload Images & Get File Paths
    const files: File[] = this.form.controls.images.value;

    // Ensure files are populated correctly
    console.log('Files before uploading:', files);

    this.claimsService.uploadClaimImages(files).subscribe((imagePaths: string[]) => {
      this.form.controls.images.setValue(imagePaths); // Set file paths in form

      // Step 2: Send Claim Data with Image Paths
      this.claimsService.newClaim(this.form.value).pipe(
        catchError(err => {
          if(err.status !== 200){
            this.sharedService.isLoading(false);
            this.dialog.open(SuccessfulClaimComponent,{
              data: {
                claimData: this.claimData,
                successful: false
              }});
            return EMPTY
          }
          else{
            return of(err);
          }
        })
      ).subscribe(
        ()=>{
          this.sharedService.isLoading(false);
          this.dialog.open(SuccessfulClaimComponent, {
            data: {
              claimData: this.claimData,
              successful: true
            }});
          this.router.navigate(['/my-profile']);
        }
      )
    });
  }

  // uploadClaimImages(files: File[]): Observable<string[]> {
  //   if (!files || files.length === 0) {
  //     return of([]); // No files to upload
  //   }
  //
  //   const formData = new FormData();
  //   files.forEach(file => formData.append("files", file)); // Append each file to formData
  //
  //   return this.claimsService.uploadImages(formData);  // Send the FormData to the backend
  // }

  ngAfterViewInit(){
    // this.enumsService.getCategories().pipe(
    //   delay(0),
    //   tap(()=> this.sharedService.isLoading(true)),
    //   catchError(err => {
    //     if(err.status !== 200){
    //       this.sharedService.isLoading(false);
    //       return EMPTY
    //     }
    //     else{
    //       return of(err);
    //     }
    //   })
    // )
    // .subscribe(res=>{
    //   this.categories = res;
    //   this.sharedService.isLoading(false);
    // })
    //
    // this.sharedService.userClaimsInformation$.subscribe((info ) =>{
    //     let information = info.map((x ) => x.insuredId);
    //     if(!information.length){
    //       this.userInformation.push(information);
    //     }
    //     else{
    //       this.userInformation = information;
    //     }
    //     console.log(this.userInformation);
    // })

  }



// public toFilesBase64(files: any): Observable<any> {
//     const result = new AsyncSubject<any>();
//     let selectedFiles  = [];
//     if (files?.length) {
//       Object.keys(files)?.forEach(async (file, i) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(files[i].file);
//         reader.onload = (e) => {
//           selectedFiles = selectedFiles?.filter((f ) => f?.name != files[i]?.file.name)
//           selectedFiles.push({ name: files[i]?.file.name, base64:reader?.result as string, type:files[i].type})
//           result.next(selectedFiles);
//           if (files?.length === (i + 1)) {
//             result.complete();
//           }
//         };
//       });
//       return result;
//     } else {
//       result.next([]);
//       result.complete();
//       return result;
//     }
//   }

  // setUser(user ){
  //   this.form.controls.name.setValue(user.firstName + " " + user.lastName)
  // }

  // updatedFiles(event ){
  //   // this.toFilesBase64(event.images).subscribe((res ) => {
  //   //   this.form.controls.files.value = res;
  //   // });
  //
  //   // this.form.controls.files.value = event.files
  // }


}

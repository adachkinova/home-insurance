import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ClaimService} from 'src/app/services/claim.service';
import {sharedService} from 'src/app/services/sharedService.service';
import {ClaimAnswerComponent} from '../claim-answer/claim-answer.component';
import {ClaimApprovedComponent} from '../claim-approved/claim-approved.component';
import {catchError, delay, tap} from 'rxjs/operators';
import {EMPTY, forkJoin, map, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-claim-details',
  templateUrl: './admin-claim-details.component.html',
  styleUrls: ['./admin-claim-details.component.css']
})
export class AdminClaimDetailsComponent implements OnInit, AfterViewInit{

  claimData;
  claimId;
  maxLimit;
  file_store:any =[]
  images;
  imageUrls;
  currentIndex: number = 0;
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private claimsService: ClaimService,
    private sharedService: sharedService,
    private toastrService: ToastrService,
    private sanitizer: DomSanitizer) {
  }


  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      this.claimId = params.get('id');
    });
  }

  ngAfterViewInit() {
    this.claimsService.getClaimById(this.claimId).pipe(
      delay(0),
      tap(() => this.sharedService.isLoading(true)),
      catchError(err => {
        if (err.status !== 200) {
          this.sharedService.isLoading(false);
          this.toastrService.error(err.error);
          return EMPTY;
        } else {
          return of(err);
        }
      })
    ).subscribe((res: any) => {
      this.claimData = res;
      this.images = res.images
      this.sharedService.isLoading(false);
      if (res.images) {
        this.processImages(res.images);
      }
    });
  }

  processImages(imagePaths: string) {
    console.log('imagePaths:', imagePaths);

    const imageArray = imagePaths.split(',').map(imagePath => {
      const fileName = imagePath.trim().substring(imagePath.lastIndexOf("\\") + 1);
      console.log('Extracted filename:', fileName);

      return this.claimsService.getImage(fileName).pipe(
        map(imageUrl => this.sanitizer.bypassSecurityTrustUrl(imageUrl))
      );
    });

    forkJoin(imageArray).subscribe((imageUrls: SafeUrl[]) => {
      this.imageUrls = imageUrls;
      console.log('Final imageUrls:', this.imageUrls);
    });
  }

  sendAnswerDeclined(){
       this.dialog.open(ClaimAnswerComponent, {
        data:
        {claimData: this.claimData,
        maxLimit: this.maxLimit},
        width: '600px',
        height:'300px'
      });
    }
  sendAnswerApproved(){
    this.dialog.open(ClaimApprovedComponent, {
      data: {claimData: this.claimData,
        maxLimit: this.maxLimit}
    });
  }

  previewFile(imgSrc: string) {
    const win = window.open();
    win.document.write(`<img src="${imgSrc}" style="width:100%; height:100%; object-fit: contain;">`);
  }

  changeSlide(direction: number): void {
    if (this.imageUrls) {
      this.currentIndex += direction;

      if (this.currentIndex >= this.imageUrls.length) {
        this.currentIndex = 0;
      } else if (this.currentIndex < 0) {
        this.currentIndex = this.imageUrls.length - 1;
      }
    }
  }

}

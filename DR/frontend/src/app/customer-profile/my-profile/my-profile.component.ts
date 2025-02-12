import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, delay, filter, of, tap } from 'rxjs';
import { PolicyService } from 'src/app/services/policy.service';
import { sharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, AfterViewInit {

  personalData : any;
  isEditing = false;
  owner: any;
  policy: any;
  // children : any;
  ownerHasPolicy: any;
  propertyData ;
  policyList ;

  constructor(private router: Router,private tostrService: ToastrService, private policyService: PolicyService, public sharedService: sharedService) { }

  ngOnInit(): void {
    const form = new FormGroup({
      name: new FormControl('name'),
      phoneNumber: new FormControl('phoneNumber'),
      egn: new FormControl('egn'),
      address: new FormControl('address'),
      kids: new FormControl('kids')
    });
  }

  ngAfterViewInit(){
    this.getPolicyList();
  }
  onEditing(){
    this.isEditing=!this.isEditing
  }

  toMyClaims(egn ){
    this.router.navigate(['/my-claims',  btoa(egn) ]);
  }

  getPolicyList() {
    let egn: any = sessionStorage.getItem("InsurerData");
    this.policyService.getInsuredPropertyByEgn(egn).pipe(
      delay(0),
      tap(() => this.sharedService.isLoading(true)),
      catchError(err => {
        if (err.status !== 200) {
          this.sharedService.isLoading(false);
          this.tostrService.error(err.error);
          return EMPTY;
        } else {
          return of(err);
        }
      })
    )
      .subscribe(
        (res) => {
          // Filter properties by the given EGN
          this.propertyData = res.filter((p) => p.propertyOwner.egn === egn);
          this.sharedService.setUserClaimsInformation(res);

          if (this.propertyData.length === 0) {
            // No policies found
            this.ownerHasPolicy = false;
            this.policyService.getPolicyTitular(egn).pipe(
              catchError(err => {
                if (err.status !== 200) {
                  this.sharedService.isLoading(false);
                  this.tostrService.error(err.error);
                  return EMPTY;
                } else {
                  return of(err);
                }
              })
            )
              .subscribe(
                (res) => {
                  this.owner = res;
                  this.sharedService.isLoading(false);
                }
              );
          } else {
            this.ownerHasPolicy = true;
            this.owner = this.propertyData[0].propertyOwner;
            this.sharedService.isLoading(false);
          }
        }
      );
  }

  navigateToInsuredProperty(): void {
    this.router.navigate(['/insured-property']);
  }

}

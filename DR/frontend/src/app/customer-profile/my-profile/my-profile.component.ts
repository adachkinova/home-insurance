import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {catchError, delay, EMPTY, of, tap} from 'rxjs';
import {PolicyService} from 'src/app/services/policy.service';
import {sharedService} from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, AfterViewInit {

  isEditing = false;
  owner: any;
  policy: any;
  ownerHasPolicy: any;
  propertyData ;

  constructor(private router: Router,private tostrService: ToastrService, private policyService: PolicyService, public sharedService: sharedService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getPolicyList();
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
        this.sharedService.isLoading(false);
        if (err.status !== 200) {
          this.tostrService.error(err.error);
          return EMPTY;
        }
        return of(err);
      })
    ).subscribe((res) => {
      // Филтрира имотите според ЕГН
      this.propertyData = res.filter((p) => p.propertyOwner.egn === egn);
      this.sharedService.setUserClaimsInformation(res);

      if (this.propertyData.length > 0) {
        this.ownerHasPolicy = true;
        this.owner = this.propertyData[0].propertyOwner;
      } else {
        this.ownerHasPolicy = false;
        this.owner = null;
      }

      this.sharedService.isLoading(false);
    });
  }

  navigateToInsuredProperty(): void {
    this.router.navigate(['/insured-property']);
  }

}

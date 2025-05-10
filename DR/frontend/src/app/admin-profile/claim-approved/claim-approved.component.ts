import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {catchError, EMPTY, of} from 'rxjs';
import {ClaimService} from 'src/app/services/claim.service';
import {sharedService} from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-claim-approved',
  templateUrl: './claim-approved.component.html',
  styleUrls: ['./claim-approved.component.css']
})
export class ClaimApprovedComponent implements OnInit {

  form ;
  maxLimitSum:number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private claimsService: ClaimService,
   private dialog: MatDialog,
   private tostrService: ToastrService,
   private router: Router,
   private sharedService: sharedService ) {

  }

  ngOnInit(): void {
    this.maxLimitSum = this.data.maxLimit;
    this.form = new FormGroup({
      paidDate: new FormControl (""),
      paidSum: new FormControl ("", Validators.required),
      declineDescription: new FormControl ("")
  });
  }

  changePaidSum(){
    if(+this.form.controls.paidSum.value>this.maxLimitSum || this.form.controls.paidSum==''){
      this.form.controls.paidSum.setErrors({'incorrect': true});
    }
    else{
      this.form.controls.paidSum.setErrors(null);
    }
  }

  approveClaim(){
    this.form.controls.paidDate.setValue(new Date());
    this.sharedService.isLoading(true);
    this.claimsService.updateClaimStatus(this.form.value, this.data.claimData.id).pipe(
      catchError(err => {
        if(err.status !== 200){
          this.sharedService.isLoading(false);
          this.tostrService.error(err.error);
          return EMPTY
        }
        else{
          return of(err);
        }
      })
    )
    .subscribe((res ) =>{
      this.sharedService.isLoading(false);
      this.tostrService.success(res.error.text)
      this.dialog.closeAll();
      this.router.navigate(['/admin-claims']);

    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormServiceInsurance } from 'src/app/services/formServiceInsurance.service';
import { PolicyService } from 'src/app/services/policy.service';
import { sharedService } from 'src/app/services/sharedService.service';
import {FormServiceInsuranceData} from "../../services/formServiceInsuranceData.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  form;
  paymentForm;
  licenseInputMask;
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private formService: FormServiceInsuranceData,
    private policyService: PolicyService,
    private sharedService: sharedService
  ) {

  }

  ngOnInit(): void {

    this.paymentForm = new FormGroup({
      cardHolderName: new FormControl ("", Validators.required),
      cvv: new FormControl ("", {validators:[Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
      expDate: new FormControl ("", Validators.required),
      creditCard: new FormControl ("",  {validators:[Validators.required, Validators.minLength(16), Validators.maxLength(16)]})
  });

  }

  formatDate(selectedDate) {
    let date = new Date(selectedDate);
    let year = date.getFullYear();
    var month: any = date.getMonth() + 1;
    var dt: any = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    let formatted = year + '-' + month + '-' + dt;
    return formatted;
  }

  continue() {
    this.sharedService.isLoading(true);
    // this.router.navigate(['/successful', 1]);
    // this.policyService.savePolicy(this.formService.getForm()).subscribe(
    //   (res: any) => {
    //     this.sharedService.isLoading(false);
    //     this.sharedService.setPolicy(res);
    //     this.router.navigate(['/successful', res.policyNumber]);
    //   },
    //   (err) => {
    //     this.sharedService.isLoading(false);
    //     this.toastrService.error(err.error);
    //     //this.router.navigate(['/error'])
    //   }
    // );

    this.policyService.savePolicy(this.formService.getForm().value).subscribe({
      next: (response: any) => {
        this.sharedService.isLoading(false);
        this.sharedService.setPolicy(response);
        this.router.navigate(['/successful', response.policyNumber]);
      },
      error: (err) => {
        this.sharedService.isLoading(false);
        this.toastrService.error(err.error);
      }
    });
  }
}



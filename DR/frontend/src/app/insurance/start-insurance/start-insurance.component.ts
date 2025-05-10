import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FormServiceInsuranceData} from "../../services/formServiceInsuranceData.service";
import {PolicyService} from "../../services/policy.service";
import {sharedService} from "../../services/sharedService.service";


@Component({
  selector: 'app-start-insurance',
  templateUrl: './start-insurance.component.html',
  styleUrls: ['./start-insurance.component.css'],
})
export class StartInsuranceComponent implements OnInit {
  constructor(private router: Router,
              private formService: FormServiceInsuranceData,
              private policyService: PolicyService,
              private sharedService: sharedService) {}

  minDate:Date=new Date();
  maxDate:Date = new Date(new Date().getFullYear(),11,31)
  form ;

  ngOnInit(): void {
    this.form = new FormGroup({
      startDate: new FormControl ("", Validators.required),
      endDate: new FormControl (null , Validators.required)
    });

    const savedStartDate = this.formService.getStartDate();
    const savedEndDate = this.formService.getEndDate();

    if (savedStartDate && savedEndDate) {
      this.form.controls['startDate'].setValue(savedStartDate);
      this.form.controls['endDate'].setValue(savedEndDate);
    }

    const savedCoverage = this.formService.getCoveragePackage();
    if (savedCoverage) {
      this.coveragePackage = savedCoverage;
      this.isActive = savedCoverage === 'STANDART';
    }
  }

  chosenDate($event ){
    const aYearFromStart = new Date($event.value);
    aYearFromStart.setFullYear(aYearFromStart.getFullYear() + 1);
    this.form.controls.endDate.setValue(aYearFromStart);
    console.log(this.form)
  }

  addPack(value:string){
    this.coveragePackage=value;

  }

  isActive = false;
  coveragePackage = '';

  togglePack(pack: string): void {
    this.coveragePackage = pack;
    this.isActive = this.coveragePackage === 'STANDART';
  }

  continue() {
    this.formService.setValidity(this.form);
    this.formService.setCoveragePackage(this.coveragePackage);

    const policyForm = this.formService.getForm().value;

    this.policyService.submitPolicyForm(policyForm).subscribe({
      next: (response) => {
        console.log("Policy submitted successfully:", response);
        const policyPrice = Number(response);
        this.sharedService.setPolicyPrice(policyPrice);
        this.formService.setPolicyPrice(policyPrice);
        this.router.navigate(['/calculate-price']);
      },
      error: (err) => {
        console.error("Error submitting policy form:", err);
      }
    });
  }
}



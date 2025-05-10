import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormServiceInsuranceData} from "../../services/formServiceInsuranceData.service";

@Component({
  selector: 'app-insured-property',
  templateUrl: './insurance-movable-property-amount.html',
  styleUrls: ['./insurance-movable-property-amount.css'],
})
export class InsuranceMovablePropertyAmount implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
    private formServiceInsurance: FormServiceInsuranceData) {
  }

  form ;
  sliderValue: number = 0;

  formatLabel(value: number): string {
    return value + ' лв';
  }

  onSliderInput(event: any): void {
    this.sliderValue = event.value;
  }

  adjustValue(amount: number): void {
    const newValue = this.sliderValue + amount;
    if (newValue >= 0 && newValue <= 100000) {
      this.sliderValue = newValue;
    }
  }

  ngOnInit(): void {
    this.formServiceInsurance.getForm();
    this.form = this.formServiceInsurance.policy;

    const existingValue = this.form.controls['insuranceMovablePropertyAmount'].value;
    this.sliderValue = existingValue ?? 0;

  }

  continue() {
        this.formServiceInsurance.setInsuranceMovablePropertyAmount(this.sliderValue);
        this.router.navigate(['/start-insurance']);
  }
}

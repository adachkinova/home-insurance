import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {sharedService} from 'src/app/services/sharedService.service';
import {Cities} from 'src/app/services/bulgaria-towns';
import {FormServiceInsuranceData} from "../../services/formServiceInsuranceData.service";

@Component({
  selector: 'app-insured-property',
  templateUrl: './insurance-amount.component.html',
  styleUrls: ['./insurance-amount.component.css'],
})
export class InsuranceAmountComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
    public cities: Cities,
    private formServiceInsurance: FormServiceInsuranceData, private sharedService: sharedService) {
  }

  form ;
  sliderValue: number = 30000;  // Default value of the slider
  propertySize: number = 0; // This will hold the size value from the service
  suggestedAmountMessage: string = ''; // Message to show the calculated amount

  formatLabel(value: number): string {
    return value + ' лв';
  }

  onSliderInput(event: any): void {
    this.sliderValue = event.value;
  }

  // Method to adjust the value using the +/- buttons
  adjustValue(amount: number): void {
    const newValue = this.sliderValue + amount;
    if (newValue >= 30000 && newValue <= 180000) {
      this.sliderValue = newValue;
    }
  }

  ngOnInit(): void {
    this.formServiceInsurance.getForm();
    this.form = this.formServiceInsurance.policy;
    this.sharedService.getPropertySize().subscribe(size => {
      this.propertySize = size;
      this.sliderValue = this.propertySize * 1500;
      this.form.controls['insuranceAmount'].setValue(this.sliderValue);
      this.updateSuggestedAmountMessage();
    });
  }

  updateSuggestedAmountMessage() {
    this.suggestedAmountMessage = `Препоръчителната застрахователна сума за вашия имот е: ${this.sliderValue} лв.`;
  }

  continue() {
        this.formServiceInsurance.setInsuranceAmount(this.sliderValue);
        this.router.navigate(['/insurance-movable-property-amount']);
  }
}


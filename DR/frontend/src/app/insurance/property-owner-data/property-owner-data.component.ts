import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/services/sharedService.service';
import { FormServiceInsuranceData } from "../../services/formServiceInsuranceData.service";

@Component({
  selector: 'app-insured-property',
  templateUrl: './property-owner-data.component.html',
  styleUrls: ['./property-owner-data.component.css'],
})
export class PropertyOwnerDataComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
    private formServiceInsurance: FormServiceInsuranceData, private sharedService: sharedService) {
  }

  form ;

  ngOnInit(): void {
    this.formServiceInsurance.getForm();
    this.form = new FormGroup({
      firstName: new FormControl("", Validators.required),
      middleName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      egn: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    });
  }

  continue() {
    if(this.form.status=='VALID'){
        this.formServiceInsurance.getForm();
        this.formServiceInsurance.setPropertyOwner(this.form);
        this.router.navigate(['/preview-input-data']);
    }
  }

}

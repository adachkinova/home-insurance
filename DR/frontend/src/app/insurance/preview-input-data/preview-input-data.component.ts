import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormServiceInsuranceData} from "../../services/formServiceInsuranceData.service";

@Component({
  selector: 'app-insured-property',
  templateUrl: './preview-input-data.component.html',
  styleUrls: ['./preview-input-data.component.css'],
})
export class PreviewInputDataComponent implements OnInit {

  constructor(private router: Router,
    private formServiceInsurance: FormServiceInsuranceData) {
  }

  form ;

  ngOnInit(): void {
    this.form = this.formServiceInsurance.getForm();
  }

  continue() {
    this.router.navigate(['/payment']);
  }

}

import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormServiceInsuranceData {
  claimForm ;

  constructor(private formBuilder: FormBuilder) {}

  insuredProperty = new FormGroup({
    size: new FormControl ("", Validators.required),
    propertyType: new FormControl ("", Validators.required),
    city: new FormControl ("", Validators.required),
    risk: new FormControl(""),
    address: new FormControl("", Validators.required)
  });

  // insuranceAmount ;
  // insuranceMovablePropertyAmount ;

  policy = new FormGroup({
    insuranceAmount: new FormControl ("", Validators.required),
    insuranceMovablePropertyAmount: new FormControl ("", Validators.required),
    coveragePackage: new FormControl ("", Validators.required),
    policyPrice: new FormControl ("", Validators.required),
    startDate: new FormControl ("", Validators.required),
    endDate: new FormControl ("" , Validators.required)
  });

  propertyOwner = new FormGroup({
    name: new FormControl("", Validators.required),
    middleName: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    egn: new FormControl("", Validators.required),
    phoneNumber: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
  });

  // policyPrice;

  getForm() {
    if (!this.claimForm) {
      this.claimForm = this.formBuilder.group({
        insuredProperty: this.insuredProperty,
        policy: this.policy,
        propertyOwner: this.propertyOwner
      });
    }
    return this.claimForm;
  }

  setInsuredProperty(form ){
    this.claimForm.controls.insuredProperty.patchValue(form.value)
  }

  getInsuredProperty(){
    return  this.claimForm.controls.insuredProperty.value
  }

  setPropertyOwner(form ){
    this.claimForm.controls.propertyOwner.patchValue(form.value)
  }

  getPropertyOwner(){
    return  this.claimForm.controls.propertyOwner.value
  }

  setCoveragePackage(coveragePackage ){
    if (!this.claimForm) {
      this.getForm();
    }
    this.claimForm.controls['policy'].get('coveragePackage')?.setValue(coveragePackage);
  }

  getCoveragePackage(){
    return  this.claimForm.controls['policy'].get('coveragePackage').value
  }

  setInsuranceAmount( insuranceAmount ){
    if (!this.claimForm) {
      this.getForm();
    }
    this.claimForm.controls['policy'].get('insuranceAmount')?.setValue(insuranceAmount);
  }

  getInsuranceAmount(){
    return this.claimForm.controls['policy'].get('insuranceAmount').value
  }

  setInsuranceMovablePropertyAmount( insuranceMovablePropertyAmount ){
    if (!this.claimForm) {
      this.getForm();
    }
    this.claimForm.controls['policy'].get('insuranceMovablePropertyAmount')?.setValue(insuranceMovablePropertyAmount);
  }

  getInsuranceMovablePropertyAmount(){
    return this.claimForm.controls['policy'].get('insuranceMovablePropertyAmount').value
  }

  setValidity(form) {
    if (!this.claimForm) {
      this.getForm();
    }

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    this.claimForm.controls['policy'].patchValue({
      startDate: formatDate(form.value.startDate),
      endDate: formatDate(form.value.endDate),
    });
  }

  getValidity(){
    return this.claimForm.controls.policy.startDate.value
  }

  setPolicyPrice(policyPrice ){
    if (!this.claimForm) {
      this.getForm();
    }
    this.claimForm.controls['policy'].get('policyPrice')?.setValue(policyPrice);
  }

  getPolicyPrice(){
    return this.claimForm.controls['policy'].get('policyPrice').value
  }
}


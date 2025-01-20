import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/services/sharedService.service';
import { Cities } from 'src/app/services/bulgaria-towns';
import { FormServiceInsuranceData } from "../../services/formServiceInsuranceData.service";

@Component({
  selector: 'app-insured-property',
  templateUrl: './insured-property.component.html',
  styleUrls: ['./insured-property.component.css'],
})
export class InsuredPropertyComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
    public cities: Cities,
    private formServiceInsurance: FormServiceInsuranceData, private sharedService: sharedService) {
  }

  form ;
  suggestions: any[] = [];
  citySuggestions: any[] = [];  // To store city suggestions

  ngOnInit(): void {
    this.formServiceInsurance.getForm();
    this.form = new FormGroup({
      size: new FormControl("", Validators.required),
      propertyType: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      risk: new FormControl(""),
      address: new FormControl("", Validators.required)
    });

    this.form.controls.city.valueChanges.subscribe((selectedCity: string) => {
      const cityData = this.cities.cities.find(city => city.name === selectedCity);
      if (cityData) {
        this.form.controls.risk.setValue(cityData.risk);
      } else {
        this.form.controls.risk.setValue("");
      }
    });

  }

  // Fetch city suggestions as the user types
  fetchCitySuggestions() {
    const query = this.form.controls.city.value;
    if (!query) {
      this.citySuggestions = [];
      return;
    }

    // Filter cities based on the input query
    this.citySuggestions = this.cities.cities.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Select a city from the suggestions
  selectCity(suggestion: any) {
    this.form.controls.city.setValue(suggestion.name);
    this.citySuggestions = [];
  }

  // Fetch autocomplete suggestions
  async fetchAutocomplete() {
    const query = this.form.controls.address.value;
    if (!query) {
      this.suggestions = [];
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
    );
    this.suggestions = await response.json();
  }

  // Select an address from autocomplete suggestions
  selectAddress(suggestion: any) {
    this.form.controls.address.setValue(suggestion.display_name);
    this.suggestions = [];
  }

  continue() {
    if(this.form.status=='VALID'){
        this.formServiceInsurance.setInsuredProperty(this.form);
        this.sharedService.setPropertySize(this.form.controls.size.value);
        this.router.navigate(['/insurance-amount']);
    }
  }

}

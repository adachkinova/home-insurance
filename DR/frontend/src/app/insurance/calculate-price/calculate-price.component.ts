import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FormServiceInsuranceData} from "../../services/formServiceInsuranceData.service";
import {sharedService} from "../../services/sharedService.service";
import {PolicyService} from "../../services/policy.service";
import {catchError, delay, EMPTY, tap} from "rxjs";


@Component({
  selector: 'app-start-insurance',
  templateUrl: './calculate-price.component.html',
  styleUrls: ['./calculate-price.component.css'],
})
export class CalculatePriceComponent implements OnInit {
  constructor(private router: Router,
              private formService: FormServiceInsuranceData,
              private policyService: PolicyService,
              private sharedService: sharedService) {}
  form ;
  policyPrice ;
  coveragePackage ;
  coverageRisks: string[];

  // Стандартно покритие
  private standardCoverage = [
    'Пожар', 'Мълния', 'Експлозия', 'Имплозия',
    'Буря', 'Пороен дъжд', 'Градушка', 'Наводнение'
  ];

  // Допълнителни покрития за оптимално покритие
  private optimalCoverage = [
    'Злоумишлени действия на трети лица', 'Вандализъм',
    'ВиК авария', 'Счупване на стъкла', 'Кражба чрез влом',
    'Грабеж за движимо имущество'
  ];

  // Допълнителни покрития за максимално покритие
  private maximumCoverage = [
    'Земетресение', 'Удар от ППС (пътно-превозно средство)',
    'Щети вследствие на индиректно попадане на мълния'
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      startDate: new FormControl ("", Validators.required),
      endDate: new FormControl (null , Validators.required)
  });
    this.policyPrice = this.formService.getPolicyPrice();
    this.coveragePackage = this.formService.getCoveragePackage();
    this.setCoverageRisks();
  }

  setCoverageRisks() {
    switch (this.coveragePackage) {
      case 'STANDART':
        this.coverageRisks = this.standardCoverage;
        break;
      case 'OPTIMAL':
        this.coverageRisks = [...this.standardCoverage, ...this.optimalCoverage];
        break;
      case 'MAXIMUM':
        this.coverageRisks = [...this.standardCoverage, ...this.optimalCoverage, ...this.maximumCoverage];
        break;
      default:
        this.coverageRisks = [];
    }
  }

  isActive = false;

  continue() {
    const egn = sessionStorage.getItem('clientData');
    if (egn) {
      this.policyService.getInsuredPropertyByEgn(egn).pipe(
        delay(0),
        tap(() => this.sharedService.isLoading(true)),
        catchError(err => {
          if (err.status !== 200) {
            this.sharedService.isLoading(false);
            return EMPTY;
          }
          return EMPTY;
        })
      ).subscribe(
        (propertyData) => {
          this.formService.setPropertyOwnerForm(propertyData[0].propertyOwner);
          this.sharedService.isLoading(false);
          this.router.navigate(['/preview-input-data']);
        }
      );
    } else {
      this.router.navigate(['/property-owner']);
    }
  }
}



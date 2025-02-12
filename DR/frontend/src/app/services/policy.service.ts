import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root',
  })
export class PolicyService {
  constructor(private http: HttpClient) {
  }


  savePolicy(userInputData: any) {
    return this.http.post('http://localhost:8099/v1/policy', userInputData, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getInsuredPropertyByEgn(egn: string) {
    return this.http.get('http://localhost:8099/v1/insured-property/' + egn)
  }

  getPolicyTitular(egn: string) {
    return this.http.get('http://localhost:8099/v1/policy-titular/' + egn)
  }

  submitPolicyForm(userInputData: any) {
    return this.http.post(`http://localhost:8099/v1/calculate-policy`, userInputData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

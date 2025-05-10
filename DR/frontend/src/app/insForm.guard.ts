import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FormServiceInsuranceData} from "./services/formServiceInsuranceData.service";


@Injectable({
  providedIn: 'root'
})
export class InsFormGurard implements CanActivate {
  constructor(public insFormService: FormServiceInsuranceData, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.insFormService?.claimForm) {
      return of(this.router.createUrlTree(['/insured-property']));
    }
    return true;
  }
}

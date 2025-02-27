import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetInsuranceComponent } from './insurance/get-insurance/get-insurance.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GuardianDataComponent } from './insurance/guardian-data/guardian-data.component';
import { PaymentComponent } from './insurance/payment/payment.component';
import { StartInsuranceComponent } from './insurance/start-insurance/start-insurance.component';
import { SuccessfulPaymentComponent } from './insurance/successful-payment/successful-payment.component';
import { NewClaimComponent } from './claims/new-claim/new-claim.component';
import { MyProfileComponent } from './customer-profile/my-profile/my-profile.component';
import { MyClaimDetailsComponent } from './customer-profile/my-claim-details/my-claim-details.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminPageClaimsComponent } from './admin-profile/admin-page-claims/admin-page-claims.component';
import { AdminClaimDetailsComponent } from './admin-profile/admin-claim-details/admin-claim-details.component';
import { AuthGuard } from './auth.guard';
import { InsFormGurard } from './insForm.guard';
import { AdminsListComponent } from './admin-profile/admins-list/admins-list.component';
import {InsuredPropertyComponent} from "./insurance/insured-property/insured-property.component";
import {InsuranceAmountComponent} from "./insurance/insurance-amount/insurance-amount.component";
import {
  InsuranceMovablePropertyAmount
} from "./insurance/insurance-movable-property-amount/insurance-movable-property-amount";
import {CalculatePriceComponent} from "./insurance/calculate-price/calculate-price.component";
import {PropertyOwnerDataComponent} from "./insurance/property-owner-data/property-owner-data.component";
import {PreviewInputDataComponent} from "./insurance/preview-input-data/preview-input-data.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'insured-property', component: InsuredPropertyComponent, canActivate: [AuthGuard]},
  {path: 'property-owner', component: PropertyOwnerDataComponent, canActivate: [AuthGuard]},
  {path: 'preview-input-data', component: PreviewInputDataComponent, canActivate: [AuthGuard]},
  {path: 'insurance-amount', component: InsuranceAmountComponent, canActivate: [AuthGuard]},
  {path: 'calculate-price', component: CalculatePriceComponent, canActivate: [AuthGuard]},
  {path: 'insurance-movable-property-amount', component: InsuranceMovablePropertyAmount, canActivate: [AuthGuard]},
  {path: 'guardianData', component: GuardianDataComponent, canActivate: [AuthGuard, InsFormGurard]},
  {path: 'start-insurance', component: StartInsuranceComponent, canActivate: [AuthGuard]},
  {path: 'packageSelection', component: GetInsuranceComponent, canActivate: [AuthGuard, InsFormGurard]},
  {path: 'payment', component: PaymentComponent},
  {path: 'successful/:id', component: SuccessfulPaymentComponent, canActivate: [AuthGuard, InsFormGurard]},
  {path: 'error', component: ErrorPageComponent, canActivate: [AuthGuard]},
  {path: 'my-new-claim', component: NewClaimComponent, canActivate: [AuthGuard]},
  {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'my-claims/:id', component: MyClaimDetailsComponent, canActivate: [AuthGuard]},
  {path: 'admin-claims', component: AdminPageClaimsComponent, canActivate: [AuthGuard]},
  {path: 'admin-list', component: AdminsListComponent, canActivate: [AuthGuard]},
  {path: 'admin-claim-details/:id', component: AdminClaimDetailsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LogInComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

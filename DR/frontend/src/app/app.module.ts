import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './additional-modules/additional-modules.module';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PaymentComponent} from './insurance/payment/payment.component';
import {StartInsuranceComponent} from './insurance/start-insurance/start-insurance.component';
import {SuccessfulPaymentComponent} from './insurance/successful-payment/successful-payment.component';
import {FooterComponent} from './footer/footer.component';
import {NewClaimComponent} from './claims/new-claim/new-claim.component';
import {SuccessfulClaimComponent} from './claims/successful-claim/successful-claim.component';
import {MyProfileComponent} from './customer-profile/my-profile/my-profile.component';
import {MyClaimDetailsComponent} from './customer-profile/my-claim-details/my-claim-details.component';
import {InsuredPropertyComponent} from './insurance/insured-property/insured-property.component';
import {ClaimsListItemComponent} from './customer-profile/claims-list-item/claims-list-item.component';
import {ProfileCardItemComponent} from './customer-profile/profile-card-item/profile-card-item.component';
import {LogInComponent} from './log-in/log-in.component';
import {AdminPageClaimsComponent} from './admin-profile/admin-page-claims/admin-page-claims.component';
import {AdminClaimDetailsComponent} from './admin-profile/admin-claim-details/admin-claim-details.component';
import {ClaimAnswerComponent} from './admin-profile/claim-answer/claim-answer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE, MatOptionModule} from '@angular/material/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ClaimApprovedComponent} from './admin-profile/claim-approved/claim-approved.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {PreviewFileComponent} from './preview-file/preview-file.component';
import {AdminsListComponent} from './admin-profile/admins-list/admins-list.component';
import {InsuranceAmountComponent} from "./insurance/insurance-amount/insurance-amount.component";
import {
  InsuranceMovablePropertyAmount
} from "./insurance/insurance-movable-property-amount/insurance-movable-property-amount";
import {CalculatePriceComponent} from "./insurance/calculate-price/calculate-price.component";
import {PropertyOwnerDataComponent} from "./insurance/property-owner-data/property-owner-data.component";
import {PreviewInputDataComponent} from "./insurance/preview-input-data/preview-input-data.component";
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    InsuredPropertyComponent,
    PropertyOwnerDataComponent,
    PreviewInputDataComponent,
    InsuranceAmountComponent,
    CalculatePriceComponent,
    InsuranceMovablePropertyAmount,
    PaymentComponent,
    StartInsuranceComponent,
    ErrorPageComponent,
    SuccessfulPaymentComponent,
    FooterComponent,
    NewClaimComponent,
    SuccessfulClaimComponent,
    MyProfileComponent,
    MyClaimDetailsComponent,
    ClaimsListItemComponent,
    ProfileCardItemComponent,
    LogInComponent,
    AdminPageClaimsComponent,
    AdminClaimDetailsComponent,
    ClaimAnswerComponent,
    ClaimApprovedComponent,
    FileUploaderComponent,
    PreviewFileComponent,
    AdminsListComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatOptionModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

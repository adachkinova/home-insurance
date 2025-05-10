import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {catchError, delay, EMPTY, forkJoin, of, tap} from 'rxjs';
import {ClaimService} from 'src/app/services/claim.service';
import {sharedService} from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-my-claim-details',
  templateUrl: './my-claim-details.component.html',
  styleUrls: ['./my-claim-details.component.css']
})
export class MyClaimDetailsComponent implements AfterViewInit {

  constructor(private router: Router,
              private tostrService: ToastrService,
              private claimsService:ClaimService,
              private sharedService: sharedService) { }

  currentIndex :number = 2;
  claimsDataOpened ;
  claimdDataClosed ;

  ngAfterViewInit(): void {
    const egn = sessionStorage.getItem('InsurerData');
    this.claimsService.getClaimByEgn(egn).pipe(
      delay(0),
      tap(() => this.sharedService.isLoading(true)),
      catchError(err => {
        if (err.status !== 200) {
          this.sharedService.isLoading(false);
          this.tostrService.error(err.error);
          return EMPTY;
        } else {
          return of(err);
        }
      })
    ).subscribe((res: any) => {
      this.claimsDataOpened = res.filter((c) => c.paidDate === null);
      this.claimdDataClosed = res.filter((c) => c.paidDate !== null);

      if (this.claimsDataOpened.length > 0) {
        const predictions$ = this.claimsDataOpened.map(claim =>
          this.claimsService.predictClaimAmount(claim).pipe(
            tap((response: any) => {
              claim.predictedClaimAmount = response.predicted_value;
            })
          )
        );

        // Wait for all predictions to finish
        forkJoin(predictions$).subscribe(() => {
          console.log('Всички предсказания са завършени!', this.claimsDataOpened);
          this.sharedService.isLoading(false);
        }, error => {
          console.error('Грешка при изчисленията:', error);
          this.sharedService.isLoading(false);
        });
      } else {
        this.sharedService.isLoading(false);
      }
    });
  }



  newClaim(){
    this.router.navigate(['/my-new-claim']);
  }

  activateTab(index:number){
    this.currentIndex = index
  }

}

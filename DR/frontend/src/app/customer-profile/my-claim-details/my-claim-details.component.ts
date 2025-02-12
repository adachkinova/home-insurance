import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {EMPTY, catchError, delay, of, tap, forkJoin} from 'rxjs';
import { ClaimService } from 'src/app/services/claim.service';
import { sharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-my-claim-details',
  templateUrl: './my-claim-details.component.html',
  styleUrls: ['./my-claim-details.component.css']
})
export class MyClaimDetailsComponent implements AfterViewInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tostrService: ToastrService,
              private claimsService:ClaimService,
              private sharedService: sharedService,
              private dialog: MatDialog) { }

  currentIndex :number = 2;
  encodedEgn: any;
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
          this.sharedService.isLoading(false); // Hide loading after all predictions are done
        }, error => {
          console.error('Грешка при изчисленията:', error);
          this.sharedService.isLoading(false); // Hide loading in case of error
        });
      } else {
        this.sharedService.isLoading(false); // Hide loading if no claims are opened
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

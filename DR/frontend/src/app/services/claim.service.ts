import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class ClaimService {

    currentClaimID ;

    constructor(private http: HttpClient){}

  predictClaimAmount(claimForm) {
    const payload = {
      PolicyType: claimForm.insuredProperty.policy.coveragePackage,
      ClaimType: claimForm.event,
      DamageType: claimForm.assetType,
      PropertySize: claimForm.insuredProperty.size,
      Location: claimForm.insuredProperty.city,
      DamageSeverity: claimForm.damageLevel,
      LossDescription: claimForm.lossDescription,
      CauseOfDamage: claimForm.damageCause,
      PreviousClaims: claimForm.previousClaims
    };
    return this.http.post('http://localhost:8099/v1/predictClaimValue', payload)
  }

    newClaim(formData: FormData ): Observable<any>{
      return  this.http.post('http://localhost:8099/v1/claim', formData )
    }

  uploadClaimImages(files: File[]): Observable<string[]> {
    if (!files || files.length === 0) {
      return of([]);
    }
    const formData = new FormData();
    files.forEach((fileWrapper: any) => {
      const file = fileWrapper?.file;
      if (file) {
        formData.append("files", file);
      }
    });
    return this.http.post<string[]>('http://localhost:8099/v1/uploadImages', formData).pipe(
      catchError(err => {
        console.error("Image upload failed:", err);
        return of([]); // Return empty array on failure
      })
    );
  }

  getImage(filename) {
    console.log('Making request for filename:', filename);
    const url = `http://localhost:8099/v1/claim-image`;
    console.log('Request URL:', url);

    return this.http.get(url, {
      params: { fileName: filename },
      responseType: 'blob'
    }).pipe(
      map(response => {
        const objectUrl = URL.createObjectURL(response);
        console.log('Generated Object URL:', objectUrl);
        return objectUrl;
      })
    );
  }

  getClaims(){
        return  this.http.get('http://localhost:8099/v1/claims' )
    }

    getClaimById(id ){
        return  this.http.get('http://localhost:8099/v1/claim/'+id )
    }

    getClaimByEgn(egn ){
        return  this.http.get('http://localhost:8099/v1/claims-user/'+egn )
    }

    updateClaimStatus(claimStatusForm , id ){
        return  this.http.put('http://localhost:8099/v1/claim-status/'+id, claimStatusForm )
    }

}

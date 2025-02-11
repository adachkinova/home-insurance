import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

    newClaim(claimForm ){
      return  this.http.post('http://localhost:8099/v1/claim', claimForm )
    }

    getClaims(){
        return  this.http.get('/v1/claims' )
    }

    getClaimById(id ){
        return  this.http.get('/v1/claim/'+id )
    }

    getClaimByEgn(egn ){
        return  this.http.get('http://localhost:8099/v1/claims-user/'+egn )
    }

    updateClaimStatus(claimStatusForm , id ){
        return  this.http.put('/v1//claim-status/'+id, claimStatusForm )
    }

    setCurrentClaimdId(id ){
        this.currentClaimID=id;
    }

    getCurrentClaimdId(){
       return this.currentClaimID;
    }


}

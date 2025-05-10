import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class sharedService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this.loading.asObservable();

  private policyInfo$ = new BehaviorSubject<any>({});
  policy$ = this.policyInfo$.asObservable();

  private userClaimsInfo$ = new BehaviorSubject<any>({});

  setPolicy(info: any) {
    this.policyInfo$.next(info);
  }

      isLoading(bool:boolean){
        this.loading.next(bool)
      }

      setUserClaimsInformation(info ){
        this.userClaimsInfo$.next(info);
      }

      previewFile(file ){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
         let base64str=(reader?.result as string);
        window.document.write('<iframe src="' + base64str  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
        }
      }

  private propertySizeSubject = new BehaviorSubject<number>(0); // Initial size set to 0
  propertySize$ = this.propertySizeSubject.asObservable(); // Observable for subscribing

  setPropertySize(size: number): void {
    this.propertySizeSubject.next(size); // Update the size
  }

  getPropertySize(): Observable<number> {
    return this.propertySize$; // Expose the observable for other components to subscribe to
  }

  setPolicyPrice(price: number) {
    this.policyInfo$.next(price);
  }

}

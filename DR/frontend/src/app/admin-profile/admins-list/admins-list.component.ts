import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, of } from 'rxjs';
import { authService } from 'src/app/services/auth.service';
import { sharedService } from 'src/app/services/sharedService.service';
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {


 ELEMENT_DATA  = [];

  displayedColumns: string[] = [ 'id_number', 'symbol'];
  dataSource ;
  showAddAdminForm:boolean=false;
  form
  constructor(private authService: authService, private sharedService: sharedService, private tostrService: ToastrService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this.authService.getAdmins().subscribe((res:any)=>{
      this.ELEMENT_DATA=res;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAdmin(){
    this.showAddAdminForm=true;
    this.form = new FormGroup({
      username: new FormControl ("", {validators:[Validators.required]}),
      password: new FormControl ("", Validators.required)
    });
  }

  sendNewAdmin(){
    if(this.form.status==="VALID"){
      this.showAddAdminForm=false;
      this.authService.addAdmin(this.form.value).pipe(
        catchError(err => {
          if(err.status !== 200){
            this.sharedService.isLoading(false);
            this.tostrService.error(err.error.text);
            return EMPTY
          }
          else{
            return of(err);
          }
        })
      )
      .subscribe((res )=>{
        this.ELEMENT_DATA.push(res);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.sharedService.isLoading(false);
        this.tostrService.success("Админа беше успешно добавен");
      })
      this.form.reset();
    }
  }

  delete(id: number, index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.isLoading(true);
        this.authService.deleteAdmin(id).pipe(
          catchError(err => {
            if (err.status !== 200) {
              this.sharedService.isLoading(false);
              this.tostrService.error(err.error.text);
              return EMPTY;
            } else {
              return of(err);
            }
          })
        )
          .subscribe((res) => {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.sharedService.isLoading(false);
            this.tostrService.success(res.error.text); // Успешно изтриване
          });
      } else {
        console.log('Изтриването е отменено');
      }
    });
  }

}

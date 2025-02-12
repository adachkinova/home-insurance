import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewFileComponent } from 'src/app/preview-file/preview-file.component';

@Component({
  selector: 'app-claims-list-item',
  templateUrl: './claims-list-item.component.html',
  styleUrls: ['./claims-list-item.component.css']
})
export class ClaimsListItemComponent implements OnInit {

  @Input("claim") claim: any;
  @Input("opened") opened: any;
  showStatus = false;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  viewAttachedDocs(){
    this.dialog.open(PreviewFileComponent, {
      data: this.claim.files,
      width: '600px',
      height:'300px'
    });
  }

  translateAssetType(type) {
    return type === 'movable' ? 'Движимо имущество' :
      type === 'immovable' ? 'Недвижимо имущество' :
        type;
  }

}

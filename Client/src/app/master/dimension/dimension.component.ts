import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DimensionDialogComponent } from './dimension-dialog/dimension-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DimensionService } from '../masterservice/dimension.service';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.css']
})
export class DimensionComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _DimensionService: DimensionService,
     public auth: AuthenticationService, 
     private router: Router,
      private _matDialog: MatDialog,
       public snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.getDimension();


    this.displayedColumns = ['id', 'name', 'edit','delete'];

  }
  getDimension() {

      let type = localStorage.getItem('type')

    this._DimensionService.getDimension().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createDimension() {
    this.dialogRef = this._matDialog.open(DimensionDialogComponent, {
      width: '600px',
      
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.getDimension();

    });

  }
  editDimension(datas) {
    this.dialogRef = this._matDialog.open(DimensionDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getDimension();
    });
  }


  deleteDimension(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Dimension?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._DimensionService. deleteDimension(id).subscribe((res: any) => {
          if (res.success) {
            this.getDimension();
            this.snackBar.open("Dimension Deleted Sucessfully", "", {
              duration: 1500,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'successSnackBar'
            });
          }

        });
      }
      this.confirmDialogRef = null;
    });
  }


}

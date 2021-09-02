import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { InspectionService } from '../services/inspection.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  constructor(private _inspectionservice: InspectionService, private router: Router) { }
  drgcode: any;
  d_partno:any
  d_revno:any;
  d_revdate:any;
  ctqchecked:any;
  fpchecked:any;
  pichecked:any;
  temp1:boolean;
  drgObject:any;
  qpaObject:any;
  psObject:any;

  displayedColumns = ['ctq','firstPartInspection','periodicInspection'];
  dataSource = [];

  ngOnInit(): void {
    let myItem1 = localStorage.getItem('DrgCode');
    this.drgcode =myItem1; 
    this.d_partno = localStorage.getItem('d_partno');
    this.d_revno = localStorage.getItem('d_revno');
    this.d_revdate = localStorage.getItem('d_revdate');
    let opnId = localStorage.getItem('opnNo')
    

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));

   this.getctq(myItem1,opnId);
   this.getfp(myItem1,opnId);
   this.getpi(myItem1,opnId);
  }


  getctq(drgcode,opnId) {
    this._inspectionservice.getctq(drgcode,opnId).subscribe((res: any) => {
      if (res.success) {
        
        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if( samp[i].ctq){
            re_data[i] = samp[i]

           if((samp[i].ctq)==true)
           {
            this.ctqchecked = true
           }
          else 
          {
             this.ctqchecked = false
          }
          
          }
          
        }
       // console.log("value of ctq is :",samp[i].ctq);
        this.dataSource = re_data;
        this.ctqchecked;
        
      }
    });
  }
  getfp(drgcode,opnId) {
    this._inspectionservice.getfp(drgcode,opnId).subscribe((res: any) => {
      if (res.success) {
        
        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if( samp[i].firstPartInspection){
            re_data[i] = samp[i]

           if((samp[i].firstPartInspection)==true)
           {
            this.fpchecked = true
           }
          else 
          {
             this.fpchecked = false
          }
          
          }
          
        }
      //  console.log("value of firstpart is :",samp[i].firstPartInspection);
        this.dataSource = re_data;
        this.fpchecked;
        
      }
    });
  }
  getpi(drgcode,opnId) {
    this._inspectionservice.getpi(drgcode,opnId).subscribe((res: any) => {
      if (res.success) {
        
        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if( samp[i].periodicInspection){
            re_data[i] = samp[i]

           if((samp[i].periodicInspection)==true)
           {
            this.pichecked = true
           }
          else 
          {
             this.pichecked = false
          }
          
          }
          
        }
       // console.log("value of ctq is :",samp[i].periodicInspection);
        this.dataSource = re_data;
        this.pichecked;
        
      }
    });
  }
  
  
  
  


/*
    let temp = localStorage.getItem("firCheck");
 

    if (temp == '1') {
      this.fircheck = true
    }
    else {
      this.fircheck = false
    }

    


    this.fircheck;
  }
*/

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  drawing() {
    localStorage.removeItem('DrgCode');

    this.router.navigate(['/drawing']);
  }

  }
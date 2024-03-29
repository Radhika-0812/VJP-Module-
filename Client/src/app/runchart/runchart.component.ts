import { Component, OnInit, ViewChild, destroyPlatform } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DrawingService } from '../services/drawing.service';
import { InspectionService } from '../services/inspection.service';
import { single } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { style } from '@angular/animations';
import {formatDate, DatePipe} from '@angular/common';
import { parse } from 'querystring';

@Component({
  selector: 'app-runchart',
  templateUrl: './runchart.component.html',
  styleUrls: ['./runchart.component.css']
})
export class RunchartComponent implements OnInit {

  constructor(private _inspectionservice: InspectionService, private router: Router) { }
  drgcode: any;
  drgnum: any;
  d_partno: any
  d_revno: any;
  d_from: any;
  d_to: any;
  d_revdate: any;
  d_batch_qty: any;
  value_expression: any;
  displayedColumns = ['id', 'opnName', 'dimension',  'toloreanceGrade', 'tolFrom', 'tolTo',  'measuringFrequency'];
  dataSource = [];
  columns: string[];
  drgObject: any;
  qpaObject: any;
  psObject: any;
  machine: any;
  routeObj :any;
  marketData: any;
  myDate = new Date();
  objectKeys = Object.keys;

  ngOnInit() {
    let myItem1 = localStorage.getItem('DrgCode');
    this.drgcode = myItem1;
    this.drgnum = localStorage.getItem('drg_number');
    this.d_partno = localStorage.getItem('d_partno');
    this.d_revno = localStorage.getItem('d_revno');
    this.d_revdate = localStorage.getItem('d_revdate');
    this.d_batch_qty = localStorage.getItem('batch_qty');
    this.d_to = localStorage.getItem('qty_to');
    this.d_from = localStorage.getItem('qty_from');
    let opnId = localStorage.getItem('opnNo')
    this.machine = localStorage.getItem('machine')
    this.getpi(myItem1, opnId);
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));
    this.routeObj = JSON.parse(localStorage.getItem('routeObj'));
    this.getmarket(this.routeObj)
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    // this.test();
  }

  getmarket(routeObj1) {
    let id = routeObj1.mpId;
    this._inspectionservice.getmarket(id).subscribe((res: any) => {
      if (res.success) {
        this.marketData = res.data;
      }
    });
  }

  printPage() {

    // let printContents, popupWin;
    // printContents = document.getElementById('test').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       <style>
    //       @media print
    //       {
    //         table { page-break-after:auto }
    //         tr    { page-break-inside:auto; page-break-after:auto }
    //         td    { page-break-inside:auto; page-break-after:auto }
    //         thead { display:table-header-group }
    //         tfoot { display:table-footer-group }
    //       }
    //       </style>
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();


    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.outerHTML);
    WindowPrt.document.write()
    setTimeout(function() {
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 2500);
  }

  getpi(drgcode, opnId) {
    this._inspectionservice.getfpi(drgcode, opnId).subscribe((res: any) => {
      if (res.success) {

        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if (samp[i].periodicInspection) {
            re_data[i] = samp[i]
          }
        }
        this.dataSource = re_data;

        var groupBy = function (xs, key) {
          return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        }
        var groubedByTeam = groupBy(res.data, 'measuringFrequency');

        delete groubedByTeam['SHIFT'];

  
        let a = [];
        for (var key in groubedByTeam) {
          let b = {
            "name": null,
            "headers": [],
            "subdata": [],
            "headers1": [],
            "headers2": [],
            "headers3": [],
            "headers4": [],
          }
          
          if (key == "100" || key == "100%") {
            b.name = parseInt(key);
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL"]
            let i = 1;
            let headers2 = [];
            while (i <= this.d_batch_qty) {
              if(this.d_from !="" && this.d_to != ""){
                if(i>=this.d_from && i<=this.d_to) {
                b.headers.push(i);
               // b.headers1.push(i);
               headers2.push(i)
                }
              } else {
                b.headers.push(i);
                // b.headers1.push(i);
                headers2.push(i)
              }
              i++;
            }
            let ie, j, temparray, chunk = 50; 

            for (ie = 0; ie < headers2.length; ie += chunk) {
              let Theaders = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL"]
              let Theaders1 = ["baloonNo", "dimension",  "tolFrom", "tolTo"]
              let Theaders4 =[]
              temparray = headers2.slice(ie, ie + chunk);
              temparray.forEach(function (entry) {
                Theaders.push(entry)
                Theaders1.push(entry)
                Theaders4.push(entry)
              });
              b.headers2.push(Theaders);
              b.headers1.push(Theaders1);
              b.headers4.push(Theaders4);
            }
            let tempz = []
            for (var z = 0; z < b.headers1.length; z++) {
              tempz.push(z);
            }
            b.headers3.push(tempz);
          }

          else if (key == "Day") {
            b.name = key;
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL",, "1"]
            b.headers1 = ["baloonNo", "dimension",  "tolFrom", "tolTo", "1"]
            b.headers4 = [""]
          }
          else if (key == "Setting" || key == "SETTING") {
            b.name = key;
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL" ,"1"]
            b.headers1 = ["baloonNo", "dimension",  "tolFrom", "tolTo", "1"]
            b.headers4 =[""]
          }
          else if (key == "Shift" || key == "SHIFT" ) {
            // b.name = key;
            // b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL",,"1", "2", "3"]
            // b.headers1 = ["id","baloonNo", "DIMENSION", "tolFrom", "tolTo",,"1", "2", "3"]
          }
          else if(key == "HEAT NUMBER PER LOT"){
            b.name = key;
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL" ,"1", "2", "3"]
            b.headers1 = ["baloonNo", "dimension",  "tolFrom", "tolTo", "1", "2", "3"]
            b.headers4 = ["", "", ""]
          

          }
          else if(key == "HOUR"){
            b.name = key;
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL", "1", "2", "3","4","5","6","7","8","9","10","11","12"]
            b.headers1 = ["baloonNo", "dimension",  "tolFrom", "tolTo", "1", "2", "3","4","5","6","7","8","9","10","11","12"]
            b.headers4 = ["", "", "", "", "", "", "", "", "", "", "", ""]
          }
          else if(key == "MELTING CHARGE"){
            b.name = key;
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL","MAX-TOL",, "1", "2", "3"]
            b.headers1 = ["baloonNo", "dimension",  "tolFrom", "tolTo", "1", "2", "3"]
            b.headers4 = ["", "", ""]
          }
          else if(key == "HEAT TREAMENT BATCH"){
            b.name = key;
            b.headers = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL", "1", "2", "3"]
            b.headers1 = ["baloonNo", "dimension",  "tolFrom", "tolTo", "1", "2", "3"]
            b.headers4 = ["", "", ""]
          }
          else {
            b.name = parseInt(key);
            // b.headers = ["S/N", "DIMENSION", "MIN-TOL", "MAX-TOL"]
            // b.headers1 = ["id", "dimension", "tolFrom", "tolTo"]
            let headers1 = []
            let length = Math.ceil(parseInt(key));
            let i = 1;
            // b.headers.push(i);
            // b.headers1.push(i);
            headers1.push(i);
            let temp = 1;
            while (i <= this.d_batch_qty) {
              
             // temp = i * 1;
        
                //temp = temp + 2;
             
              
              if (temp < this.d_batch_qty) {

                temp = temp + 1;
                
                if(this.d_from !="" && this.d_to != ""){
                if(temp<=this.d_to && temp>=this.d_from) {
                // b.headers.push(temp);
                // b.headers1.push(temp);
                headers1.push(temp);
                }
              } else {
                headers1.push(temp);
              }
              }
              // else {
              //   // b.headers.push(this.d_batch_qty);
              //   // b.headers1.push(this.d_batch_qty);
              //   headers1.push(this.d_batch_qty);
              // }
              i++;
            }
            /*if(this.d_to !="") {
              if(headers1[-1] != this.d_to){
                headers1.push(this.d_to);
              }
            } else if(headers1[-1] != this.d_batch_qty){
              headers1.push(this.d_batch_qty);
            }*/
            let ie, j, temparray, chunk = 50;
            for (ie = 0; ie < headers1.length; ie += chunk) {
              let Theaders = ["S/N","B/N", "DIMENSION", "MIN-TOL", "MAX-TOL"]
              let Theaders1 = ["baloonNo", "dimension",  "tolFrom", "tolTo"]
              let Theaders4 =[]
              temparray = headers1.slice(ie, ie + chunk);
              temparray.forEach(function (entry) {
                Theaders.push(entry)
                Theaders1.push(entry)
                Theaders4.push(entry)
              });
              b.headers2.push(Theaders);
              b.headers1.push(Theaders1);
              b.headers4.push(Theaders4);
            }
            let tempz = []
            for (var z = 0; z < b.headers1.length; z++) {
              tempz.push(z);
            }
            b.headers3.push(tempz);
          }
          b.subdata = groubedByTeam[key]
          a.push(b);
        }
        this.value_expression = a;
      }
    });
  }

  isNumber(val) { 
    if(typeof val === 'number')
    {
      if(val == 100)
      {
        return false
      }
      else{
        return true
      }
    }   
    else{
      return false
    }
  }

  isHundred(val) {
    if(typeof val === 'number')
    {
      if(val == 100)
      {
        return true
      }
      else{
        return false
      }
    }
    }
}
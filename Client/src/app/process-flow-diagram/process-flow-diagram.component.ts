import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OperationService } from '../services/operation.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-process-flow-diagram',
  templateUrl: './process-flow-diagram.component.html',
  styleUrls: ['./process-flow-diagram.component.css']
})
export class ProcessFlowDiagramComponent implements OnInit {
  drgObject: any;
  qpaObject: any;
  pfNo: any;
  workData: any;
  type: any;
  processData: any;
  operationName:any;
  operationNo:any;
  productData: any;
  incomingData: any;
  process: any;

  constructor(private router: Router ,private _operationservice: OperationService) { 
  this.getoperationdetails()   }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('psObject'));
    // this.pfNo =JSON.parse(localStorage.getItem('pfNo'));
   this.getData();
  
  }


  

getData(){

 

  let str =(localStorage.getItem('pfNo'));
  
 
  if(str.includes("-20")){
    console.log("1");
    let id = (localStorage.getItem('DrgCode'));
    this._operationservice.getAltprocess(id).subscribe((res: any) => {
      if (res.success) {
        this.process = res.data;
        debugger
      }
    });

  }

  else if(str.includes("-30")){
    console.log("2");
    let id = (localStorage.getItem('DrgCode'));
    this._operationservice.getkindprocess(id).subscribe((res: any) => {
      if (res.success) {
        this.process = res.data;
        debugger
      }
    });
   
  }

  else{
    console.log("3");
    let id = (localStorage.getItem('DrgCode'));
    this._operationservice.getoperation(id).subscribe((res: any) => {
      if (res.success) {
        this.process = res.data;
        debugger
      }
    });
  }
}
 


getoperationdetails() {

  let type = localStorage.getItem('type')
  this._operationservice.getoperationdetails().subscribe((res: any) => {
    if (res.success) {
      this.workData = res.data;
    }
  });
}




  printPage() {

    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=10,top=10,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write();


    setTimeout(function () {
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 800);
  }


}

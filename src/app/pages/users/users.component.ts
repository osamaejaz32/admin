import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DialogService } from "ng6-bootstrap-modal";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../extra/modal/modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  produts:any = [];
  page = 4;
  constructor(public api: ApiService,
    public router: Router,
    private dialogService:DialogService,
    private modalService: NgbModal, private modalService2: NgbModal) { }

  ngOnInit() {  
    this.getAllProducts()
  }
  getAllProducts(){
    // this.api.getAllProducts().then((res: any)=>{
    //     if(res.status){
    //       this.produts = res.data;
    //     }
    //   })
    this.api.getAllProducts().subscribe(res=>{  
      console.log(res);
      if(res.status){
          this.produts = res.data;
          const product = this.produts.map((item)=>{
            console.log(item)
          })
        }
    })
  }
  editProduct(product){
    console.log(product)
    this.router.navigate(['/add-product',{id: product._id}])
  }
  deleteProduct(product){
    const modal = this.modalService2.open(ModalComponent, { windowClass: 'dark-modal' });
    modal.componentInstance.data = 'xxxxxx';
    modal.result.then(res=>{
      if(res == 1){
        this.api.daleteProduct(product._id).then((res:any)=>{
          if(res.status){
            this.getAllProducts();
          }
        })
      }
    });
  }
  getCsv(){
    new ngxCsv(this.produts, 'My Report');
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.produts, event.previousIndex, event.currentIndex);
    // this.produts.splice(event.currentIndex,1)
  }
}

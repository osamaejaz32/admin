import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
  	public activeRoute: ActivatedRoute) { 
  
  }

  ngOnInit() {
  }
  dismiss(val){
  	this.activeModal.close(val);
  }
}

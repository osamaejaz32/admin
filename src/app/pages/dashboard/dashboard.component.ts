import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fields:any = [
  	{name: 'name',placeholder:'Name',type: 'text'}
  ];
  orderForm: FormGroup;
  items: FormArray;
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.orderForm = this.formBuilder.group({
    customerName: '',
    email: '',
    items: this.formBuilder.array([ this.createItem() ])
  });
  }
  addMoreFields(){
  	this.fields.push({name: 'name',placeholder:'zz',type:'textarea'})
  }
  createItem(): FormGroup {
	  return this.formBuilder.group({
	    name: '',
	    description: '',
	    price: ''
	  });
	}
	addItem(): void {
	  this.items = this.orderForm.get('items') as FormArray;
	  this.items.push(this.createItem());
	}
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

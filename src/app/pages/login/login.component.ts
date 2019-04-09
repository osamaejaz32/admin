import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(public router: Router,
    public api: ApiService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required])]
    })
  }
  login(){
  	this.api.doLogin(this.loginForm.value).then((res:any)=>{
      localStorage.setItem('currentUser','true');
      this.router.navigate(['/']);
    })
  }
}

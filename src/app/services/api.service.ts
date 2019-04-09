import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
}) 

export class ApiService {
  BASE_PATH = 'http://192.168.0.128:3000/';
  header = new HttpHeaders({
  'token': 'abcdef'
})
  constructor(private http: HttpClient) { }
  getAllProducts(): Observable  <any>{
    return Observable.create(observer=>{
      this.http.get(this.BASE_PATH+'product/show-product',{headers: this.header}).subscribe(res=>{
        observer.next(res);
        observer.complete();
      });
    }) 
  	// return new Promise((resolve,reject)=>{
  		// this.http.get(this.BASE_PATH+'product/show-product',{headers: this.header}).subscribe(res=>{
  	// 		resolve(res);
  	// 	},(err)=>{
  	// 		reject(err);
  	// 	})
  	// })
  }
  // getAllProducts(){
  //   const api = from(fetch(this.BASE_PATH+'product/show-product'));
  //   return api.subscribe({
  //     next(res){ console.log(res) },
  //     error(err){ console.log(err) },
  //     complete(){ 'Completed' }
  //   })
  // }
  saveProduct(postData){
  	return new Promise((reslove,reject)=>{
  		this.http.post(this.BASE_PATH+'product/add-product',postData).subscribe((res)=>{
  			reslove(res)
  		},(err)=>{
  			reject(err)
  		})
  	})
  }
  getProductDetails(id){
  	return new Promise((reslove,reject)=>{
  		this.http.get(this.BASE_PATH+'product/show-product/'+id).subscribe((res)=>{
  			reslove(res)
  		},(err)=>{
  			reject(err)
  		})
  	})
  }
  daleteProduct(id){
  	return new Promise((reslove,reject)=>{
  		this.http.get(this.BASE_PATH+'product/delete-product/'+id).subscribe((res)=>{
  			reslove(res)
  		},(err)=>{
  			reject(err)
  		})
  	})
  }
  doLogin(postdata){
    return new Promise((resolve,reject)=>{
      this.http.post(this.BASE_PATH+'user/loginUser',postdata).subscribe((res)=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }
  addEvent(postdata): Observable <any>{
    return Observable.create(observer=>{
      this.http.post(this.BASE_PATH+'event/add-event',postdata,{headers: this.header}).subscribe(res=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
}

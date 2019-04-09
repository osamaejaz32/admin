import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  base64textString:any;
  private productForm: FormGroup;
  url:any = 'http://192.168.0.128:3000/product/add-product';
  imageChanged:boolean = false;
  numbersReg:any = '^[0-9]*$';
  imageIsUploaded:any;
  categories = [
        {id: 1,cat_name: 'Men'},
        {id: 1,cat_name: 'WoMen'},
        {id: 1,cat_name: 'Men'},
        {id: 1,cat_name: 'Me'}
    ]
   public uploader: FileUploader = new FileUploader({url: this.url, itemAlias: 'avatar'});
   images:any = [];
  constructor(public router: Router,
              public formBuilder: FormBuilder,
              public api: ApiService,
              public activeRoute: ActivatedRoute) { 
    this.productForm = this.formBuilder.group({
      product_id:['0'],
      product_name: ['',Validators.compose([Validators.required])],
      manufactured_by: ['',Validators.compose([Validators.required])],
      product_price: ['',Validators.compose([Validators.required,Validators.pattern(this.numbersReg)])],
      product_quantity: ['',Validators.compose([Validators.required,Validators.pattern(this.numbersReg)])],
      product_details: ['',Validators.compose([Validators.required])],
      product_image: ['',Validators.compose([])]
    })
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((res)=>{
      console.log(res)
      if(res.id != null){
        this.api.getProductDetails(res.id).then((val:any)=>{
          this.productForm.patchValue({product_id: val._id});
          this.productForm.patchValue({product_name: val.product_name});
          this.productForm.patchValue({manufactured_by: val.manufactured_by});
          this.productForm.patchValue({product_price: val.product_price});
          this.productForm.patchValue({product_quantity: val.product_quantity});
          this.productForm.patchValue({product_image: val.product_image});
          this.productForm.patchValue({product_details: val.product_details});
          // alert(val.filename)
          if(val.filename !== ''){
            this.imageIsUploaded = val.filename;;
          }
        })
      }
    })

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('product_id',this.productForm.value.product_id);
      form.append('product_name',this.productForm.value.product_name);
      form.append('manufactured_by',this.productForm.value.manufactured_by);
      form.append('product_price',this.productForm.value.product_price);
      form.append('product_quantity',this.productForm.value.product_quantity);
      form.append('product_details',this.productForm.value.product_details);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item._xhr.response)
      let res = JSON.parse(item._xhr.response);
      if(res.status){
        this.router.navigate(['/products']);
      }
     };
  }
  saveProduct(){
    if(this.imageChanged){
      this.uploader.uploadAll()
    }
    else{
      this.api.saveProduct(this.productForm.value).then((res:any)=>{
        if(res.status){
          this.router.navigate(['/products']);
        }
      })
    }
    
  }

  // handleFileSelect(evt){
  //   console.log(evt)
  //   this.imageChanged = true;
  //     var files = evt.target.files;
  //     var file = files[0];

  //   if (files && file) {
  //       var reader = new FileReader();

  //       reader.onload =this._handleReaderLoaded.bind(this);

  //       reader.readAsBinaryString(file);
  //   }
  // }


onSelectFile(event) {
  console.log(event.target.files)
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event) => {
                   this.images.push(event.target['result']); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            // this.productForm.value.product_image = this.base64textString;
            console.log(btoa(binaryString));
    }
}

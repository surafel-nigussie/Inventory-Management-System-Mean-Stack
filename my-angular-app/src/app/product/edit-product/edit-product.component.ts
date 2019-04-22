import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {FormControl,FormBuilder, FormGroup,Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/salesform/category.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  categories$
  editProduct:FormGroup
  constructor(private fb:FormBuilder,public productService: ProductService,private router: ActivatedRoute,  category:CategoryService) {
  this.categories$ =category.getall();
  this.editProduct = fb.group({
    'name':new FormControl('',Validators.required),
    'brand':new FormControl('',Validators.required),
    'description':new FormControl('',Validators.required),
    'quantity':new FormControl('',Validators.required),
    'price':new FormControl('',Validators.required),
    'category':new FormControl('',Validators.required),
    'username':new FormControl('',Validators.required),
  });
  
  }

  editProducts() {
    this.productService.editProduct(this.editProduct.value).subscribe((data) => {console.log('product is editted') },
     (err) => {console.log('can not edit Product')})
  }

  saveProduct():void{
    this.productService.addProduct(this.editProduct.value).
    subscribe((data)=>{console.log('New product added')},(err)=>{console.log('Cannot add this product')})

  }
  ngOnInit() {
    this.productService.getProductById(this.router.snapshot.paramMap.get('id')).subscribe((data)=>{
   
      this.editProduct.patchValue({
        name:data.name
      })
    })
  }

}

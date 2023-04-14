import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  error!: string;

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onSubmit() {
    this.productService
      .addProduct(new Product(this.productForm.value))
      .subscribe({
        next: (product: Product) => this.router.navigate(['../products', product.id]),
        error: err => this.error = err.message
      });
    console.log(this.productForm.value);
  }
}

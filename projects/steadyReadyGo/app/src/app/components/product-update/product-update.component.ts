import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent {
  id!: number;
  error!: string;

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.productService.getProduct(this.id).subscribe({
      next: (product: Product) => this.productForm.patchValue(product),
      error: () => this.router.navigate(['../products']),
    });

    this.productForm.controls['id'].disable();
  }

  onSubmit() {
    this.productService
      .updateProduct(this.id, new Product(this.productForm.value))
      .subscribe({
        next: (product: Product) =>
          this.router.navigate(['../products', product.id]),
        error: (err) => (this.error = err.error.message),
      });
  }
}

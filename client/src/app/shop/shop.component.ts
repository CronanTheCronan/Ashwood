import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IProductCategory } from '../shared/models/product-category';
import { ShopParams } from '../shared/models/shop-params';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  productCategories: IProductCategory[];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  totalCount: number;

  constructor(private shop: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductCategories();
  }

  getProducts() {
    this.shop.getProducts(this.shopParams).subscribe({
      next: (result) => {
        this.products = result.data;
        this.shopParams.pageSize = result.pageSize;
        this.shopParams.pageNumber = result.pageIndex;
        this.totalCount = result.count;
      },
      error: (err) => console.log(err) 
    });
  }

  getProductCategories() {
    this.shop.getProductCatgories().subscribe({
      next: (result) => {
        this.productCategories = [{id: 0, name: 'All'}, ...result];
        this.shopParams.pageNumber = 1;
      },
      error: (err) => console.log(err)
    });
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}

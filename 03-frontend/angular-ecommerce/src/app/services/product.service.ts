import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(id: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${id}`

    return this.httpClient
      .get<Product>(productUrl);
  }

  getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;

    return this.httpClient
      .get<GetResponseProduct>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`

    return this.getProducts(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(
    page: number,
    pageSize: number,
    keyword: string): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;

    return this.httpClient
      .get<GetResponseProduct>(searchUrl);
  }

  getProducts(url: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProduct>(url)
      .pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map(response => response._embedded.productCategory));
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}

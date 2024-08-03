import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from "./components/cart-status/cart-status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductListComponent,
    ProductCategoryMenuComponent,
    HttpClientModule,
    SearchComponent,
    NgbModule,
    CartStatusComponent,
    RouterLink
],
  providers: [ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ecommerce';
}

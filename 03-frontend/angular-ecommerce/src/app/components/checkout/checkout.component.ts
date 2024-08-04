import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creaditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopService: Luv2ShopFormService
  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    })

    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.luv2ShopService
      .getCreditCardMonths(startMonth)
      .subscribe(data => {
        console.log('credit card month: ' + JSON.stringify(data));
        this.creaditCardMonths = data;
      })

    this.luv2ShopService
      .getCreditCardYears()
      .subscribe(data => {
        console.log('credit card year: ' + JSON.stringify(data));
        this.creditCardYears = data;
      })

    // populate countries
    this.luv2ShopService
      .getCountries()
      .subscribe(data => {
        console.log('countries: ' + JSON.stringify(data));
        this.countries = data;
      })
  }

  copyShippingToBilling(event: Event) {

    if ((event.target as HTMLInputElement).checked) {
      // bug fix here (copy inappropriate problem)
      this.billingStates = this.shippingStates;
      
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingStates = [];
    }
  }

  updateCreditCardMonths() {
    const currentYear = new Date().getFullYear();
    const { expirationYear: selectedYear } = this.checkoutFormGroup.get('creditCard')?.value;
    let startMonth: number;

    if (+selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.luv2ShopService
      .getCreditCardMonths(startMonth)
      .subscribe(data => {
        console.log(`months: ${JSON.stringify(data)}`)
        this.creaditCardMonths = data;
      })
  }

  onSubmit() {
    console.log('Handling submit event')
    console.log(this.checkoutFormGroup.value);

    console.log('The shipping address: ' + this.checkoutFormGroup?.get('shippingAddress')?.value.country.name)
    console.log('The shipping address: ' + this.checkoutFormGroup?.get('shippingAddress')?.value.state.name)
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    console.log(countryCode)

    this.luv2ShopService
      .getStates(countryCode)
      .subscribe(data => {
        console.log(`states: ${JSON.stringify(data)}`);

        if (formGroupName === 'shippingAddress') {
          this.shippingStates = data;
        }
        else {
          this.billingStates = data;
        }

        formGroup?.get('state')?.setValue(data[0]);
      })
  }
}

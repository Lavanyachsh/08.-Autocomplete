import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CustomErrorStateMatcher } from "../../helpers/customErrorStateMatcher";
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/Models/Booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit
{
  //properties
  Booking:any={};
  results : any;
  countries: any;
  formGroup: FormGroup;
  customErrorStateMatcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
  cities: any[] = [
    { id: 1, cityName: "Abu Dhabi" },
    { id: 2, cityName: "Amsterdam" },
    { id: 3, cityName: "Berlin" },
    { id: 4, cityName: "Chicago" },
    { id: 5, cityName: "Doha" },
    { id: 6, cityName: "Dubai" },
    { id: 7, cityName: "Istanbul" },
    { id: 8, cityName: "Las Vegas" },
    { id: 9, cityName: "London" },
    { id: 10, cityName: "Los Angeles" },
    { id: 11, cityName: "Moscow" },
    { id: 12, cityName: "New York" },
    { id: 13, cityName: "Paris" },
    { id: 14, cityName: "San Francisco" },
    { id: 15, cityName: "Seoul" },
    { id: 16, cityName: "Singapore" },
    { id: 17, cityName: "Sydney" },
    { id: 18, cityName: "Tokyo" },
    { id: 19, cityName: "Toronto" },
    { id: 20, cityName: "Washington" }
  ];

  constructor(private countriesService: CountriesService,private bookingService:BookingService)
  {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      customerName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.pattern('^[A-Za-z. ]*$')]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null)
    });
  }

  ngOnInit(): void
  {
    debugger;
    this.countriesService.getCountries().subscribe(
      (response) =>
      {
        this.countries = response;
      },
      (error) =>
      {
        console.log(error);
      });
  }

  //returns the form control instance based on the control name
  getFormControl(controlName: string): FormControl
  {
    return this.formGroup.get(controlName) as FormControl;
  }

  //returns the error message based on the given control and error
  getErrorMessage(controlName: string, errorType: string): string
  {
    //controlName = "customerName"
    //errorType = "required"
    switch (controlName)
    {
      case "customerName":
        {
          if (errorType === "required")
            return "You must specify <strong>Name</strong>";
          else if (errorType === "maxlength")
            return "<strong>Name</strong> can contain up to 30 characters only";
          else if (errorType === "pattern")
            return "<strong>Name</strong> can contain alphabets or dot (.) or space only";
          else
            return "";
        }

      case "email":
        {
          if (errorType === "required")
            return "<strong>Email</strong> can't be blank";
          else if (errorType === "email")
            return "<strong>Email</strong> should be in correct format. Eg: someone@example.com";
          else
            return "";
        }

      case "country":
        {
          if (errorType === "required")
            return "You must choose a <strong>Country</strong>";
          else
            return "";
        }

      default: return "";
    }
  }
  onSubmit()
  {
    debugger;
    console.log(this.formGroup);
    console.log("eterier form values:"+this.formGroup.value);
    console.log("------------------------------------------------------");
     console.log("email data:" + this.formGroup.value.email);
     console.log("city data:" + this.formGroup.value.city);
    console.log("country:"+ this.formGroup.value.country);
    console.log("customername:"+this.formGroup.value.customerName);
    console.log("------------------------------------------------------");
   // Booking obj=new Booking();
   // let booking = { this.formGroup.value.email, this.formGroup.value.city, this.formGroup.value.country,this.formGroup.value.customerName};
//console.log("final booking object:");
//console.log("final booking object:",booking);
//console.log(booking);

    this.bookingService.postBooking(this.formGroup.value).subscribe(
      (response) =>
      {
        debugger;
        alert("booking saved sucessfully");
        this.results = response;
      },
      (error) =>
      {
        console.log(error);
      });
    debugger;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Booking } from '../Models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private readonly httpClient:HttpClient)
   { 
  
   }
   postBooking(booking: Booking): Observable<any>
   {
    debugger;
     return this.httpClient.post<any>(`http://localhost:61983/api/Booking/AddBookingDetails`, booking);
   }
}

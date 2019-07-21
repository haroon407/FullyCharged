import axios from "axios";
import config from "react-global-configuration";

class BookingsServiceClass {
  getAllBookings() {
    const URL = "http://localhost:3200/bookings"; // port of backend
    return axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMwZWZjMWMwZWE0NTM5ZDgxNWY1ZWEiLCJpYXQiOjE1NjM2NTk5OTEsImV4cCI6MTU2Mzc0NjM5MX0.VnJnO4_muMuWZVnbAzDQelbeNttykiVbiYjAFKd0G1M" // token
      }
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  getBookingById(bookingIdObject) {
    const URL = "http://localhost:3200//bookings/:id/charge";
    return axios(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "" //TOKEN
      },
      data: bookingIdObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  cancelBookingById(bookingIdObject) {
    const URL = "http://localhost:3200/bookings/:id/cancel";
    return axios(URL, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMwZWZjMWMwZWE0NTM5ZDgxNWY1ZWEiLCJpYXQiOjE1NjM2NTk5OTEsImV4cCI6MTU2Mzc0NjM5MX0.VnJnO4_muMuWZVnbAzDQelbeNttykiVbiYjAFKd0G1M" // token
      },
      data: bookingIdObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}
const BookingsService = new BookingsServiceClass();
export default BookingsService;

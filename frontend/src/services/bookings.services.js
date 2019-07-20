import axios from "axios";

class BookingsServiceClass {
  getAllBookings() {
    const URL = "http://localhost:6000/bookings/allbookings"; // port of backend
    return axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDMwZWZjMWMwZWE0NTM5ZDgxNWY1ZTkiLCJpYXQiOjE1NjM2MTgzMDcsImV4cCI6MTU2MzcwNDcwN30.dhUJuo-lwdc3rAchDTcSkLe-tPtV4tVQ5PYstzI_aBI" // token
      }
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  getBookingById(bookingIdObject) {
    const URL = "http://localhost:5000/bookings/bookingid";
    return axios(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "" // token
      },
      data: bookingIdObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  cancelBookingById(bookingIdObject) {
    const URL = "http://localhost:5000/bookings/cancelbookingid";
    return axios(URL, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "" // token
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

import axios from "axios";
import baseUrl from './baseUrl';

class UsersServiceClass {
  signIn(signInObject) {
    const URL = baseUrl +"/auth/login"; // port of backend
    return axios(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      data: signInObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  signUpEVO(signUpObject) {
    const URL = baseUrl +"/auth/register";
    return axios(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: signUpObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  signUpEVCP(signUpObject) {
    const URL = baseUrl +"/auth/register";
    return axios(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: signUpObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}
const UsersService = new UsersServiceClass();
export default UsersService;

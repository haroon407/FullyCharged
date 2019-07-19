import axios from "axios";

class UsersServiceClass {
  signIn(signInObject) {
    const URL = "http://localhost:5000/auth/login"; // port of backend
    return axios(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: signInObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  signUpEVO(signUpObject) {
    const URL = "http://localhost:5000/index/evo-register";
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
    const URL = "http://localhost:5000/index/evcp-register";
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

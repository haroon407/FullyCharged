import axios from "axios";

class SignInServiceClass {
  signIn(signInObject) {
    const URL = "http://localhost:3000/index/sign-in";
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
}
const SignInService = new SignInServiceClass();
export default SignInService;

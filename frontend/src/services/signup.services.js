import axios from "axios";

class SignUpServiceClass {
  signUp(signUpObject) {
    const URL = "http://localhost:3000/index/sign-up";
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
const SignUpService = new SignUpServiceClass();
export default SignUpService;

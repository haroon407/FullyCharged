import axios from 'axios';
import HttpService from '../services/HttpService';

class AuthServiceClass {

  loginUser(email, password){
    let data = {
      email: email,
      password: password
    }
    HttpService.post(HttpService.apiURL() + '/auth/login', data, function onSuccess(res){
      console.log("Login successful");
      console.log(res);
    }, function onError(){
      console.log("Login error");
    });
  }

  registerUser(name, email, password, role){
    let data = {
      name: name,
      email: email,
      password: password,
      role: role
    }
    HttpService.post(HttpService.apiURL() + '/auth/register', data, function onSuccess(res){
      console.log("Registration successful");
      console.log(res);
    }, function onError(){
      console.log("Registration error");
    });
  }



}
const AuthService = new AuthServiceClass();
export default AuthService;

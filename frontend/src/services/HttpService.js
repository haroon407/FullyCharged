export default class HttpService {
    constructor() {
    }

    static apiURL() {return "http://localhost:3001"; }

    static get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'GET',
            headers: header
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
            }
            else {
                console.log("Got here:");
                console.log(resp);
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                console.log("Got here22:");
                console.log(resp);
                onSuccess(resp);
            }
        }).catch((e) => {
          console.log("Got here33:");
          console.log(e);
            onError(e.message);
        });
    }

    static put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                return;
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static post(url, data, onSuccess, onError) {

        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                return;
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }

        fetch(url, {
            method: 'DELETE',
            headers: header
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
                return;
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                onSuccess(resp)
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static checkIfUnauthorized(res) {
        if(res.status == 401) {
            return true;
        }
        return false;
    }

}

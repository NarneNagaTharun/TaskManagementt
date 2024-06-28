import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http: HttpClient = inject(HttpClient);

  signUp(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4WPoIKAC2yX9Fyh29Rn05BAJPZxG7lBM",
      data
    );
  }
}

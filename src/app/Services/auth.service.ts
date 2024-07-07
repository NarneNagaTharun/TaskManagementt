import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { catchError, Subject, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../Model/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  userEmitter = new Subject<User>();

  signUp(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4WPoIKAC2yX9Fyh29Rn05BAJPZxG7lBM",
        data
      )
      .pipe(
        catchError((err) => this.handleError(err)),
        tap((response)=> this.handleCreateUser(response))
    );
  }

  login(email: string, password: string) {
    let data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4WPoIKAC2yX9Fyh29Rn05BAJPZxG7lBM",
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => this.handleCreateUser(response))
      );
  }

  handleError(err) {
    console.log(err);
    let errMsg: string = "Some unknown issue occured";
    if (!err.error || !err.error.error) {
      return throwError(() => errMsg);
    } else {
      switch (err.error.error.message) {
        case "EMAIL_EXISTS":
          errMsg = "This email already exists";
          break;
        case "OPERATION_NOT_ALLOWED":
          errMsg = "Performing this operation is not allowed";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          errMsg = "Many failed attempts, Try again later";
          break;
        case "INVALID_LOGIN_CREDENTIALS":
          errMsg = "Provided credentials are incorrect";
          break;
      }
      return throwError(() => errMsg);
    }
  }

  handleCreateUser(userDetails){
    const expiresInTimeStamp = new Date().getTime() + (+userDetails.expiresIn*1000);
    const user: User = new User(userDetails.email, userDetails.localId, userDetails.idToken, new Date(expiresInTimeStamp));
    console.log(expiresInTimeStamp, userDetails);
    this.userEmitter.next(user);
  }
}

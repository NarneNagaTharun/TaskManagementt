import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { Observable } from "rxjs";
import { AuthResponse } from "../Model/AuthResponse";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoginMode: boolean = true;
  authService: AuthService = inject(AuthService);
  isLoading: boolean = false;
  errorMessage: string | null = null;
  signinLoginObs: Observable<AuthResponse>;
  router: Router = inject(Router);

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.isLoading = true;
      this.signinLoginObs = this.authService.login(email, password);
    } else {
      this.isLoading = true;
      console.log(form.value.password); //null because reset above already
      this.signinLoginObs = this.authService.signUp(email, password);
    }

    this.signinLoginObs.subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (errMsg) => {
        console.log(errMsg);
        this.isLoading = false;
        this.errorMessage = errMsg;
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
    form.reset();
  }
}

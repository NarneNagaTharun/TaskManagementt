import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoginMode: boolean = true;
  authService: AuthService = inject(AuthService);

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    form.reset();

    if (this.isLoginMode) {
      return;
    } else {
      console.log(form.value.password);
      this.authService.signUp(email, password).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      });
    }
  }
}
//Updating
//Updating 2nd time

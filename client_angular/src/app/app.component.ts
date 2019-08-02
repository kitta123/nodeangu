import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  profileForm: FormGroup;
  onSubmitted: boolean = false;
  public birthdate: Date;
  public age: number;

constructor(private loginservice: LoginService, private formBuilder: FormBuilder) {
  this.profileForm = this.formBuilder.group({
    customer_id : new FormControl('',[Validators.required , Validators.pattern('^[0-9]*$')]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]*$')]),
    dateofbirth: new FormControl('', [Validators.required , Validators.pattern('^[0-9]*$')]),
    age: new FormControl('', [Validators.required , Validators.pattern('^[0-9]*$')]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$')]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(80),
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]),
  });
}
  ngOnInit() {}

    onSubmit() {
      this.loginservice.addCustomer(this.profileForm.value)
      .subscribe(customer => {
        console.log('success',customer)
      });

    console.warn(this.profileForm.value);

      this.onSubmitted = true;
      if (this.profileForm.invalid) {
        return;
      }
      alert('SUCCESS!!');
    }
  }

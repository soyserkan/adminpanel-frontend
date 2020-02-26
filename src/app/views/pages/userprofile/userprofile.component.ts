import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'kt-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  form: FormGroup
  user: AuthData
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      date_of_birth: new FormControl(null, {
        validators: []
      }),
      phone: new FormControl(null, {
        validators: []
      }),
    });
    this.authService.getUserByToken().subscribe((data: AuthData) => {
      this.user = data;
      console.log(this.user)
      this.form.setValue({
        fullname: this.user.fullname,
        email: this.user.email,
        date_of_birth: this.user.date_of_birth,
        phone: this.user.phone
      })
    })


    // this.userId = this.authService.getUserId();

  }

  onSaveProfile() {
    if (this.form.invalid) {
      return;
    }
    // this.userProfileService.changeUserProfile(
    //   this.form.value.fullname,
    //   this.form.value.email,
    //   this.form.value.date_of_birth,
    //   this.form.value.phone
    //   )
  }




}



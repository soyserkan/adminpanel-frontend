import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';
import { mimeType } from './mime-type.validator';
import { PageNoticeService } from '../page-notices/page-notices.service';
@Component({
  selector: 'kt-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit, OnDestroy {

  form: FormGroup
  user: AuthData
  isShow = false
  imagePreview: string

  constructor(
    private authService: AuthService,
    private pageNoticeService: PageNoticeService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      date_of_birth: new FormControl(null, {
        validators: [Validators.minLength(8)]
      }),
      phone: new FormControl(null, {
        validators: [Validators.minLength(10)]
      }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.authService.getUserByToken().subscribe((data: AuthData) => {
      this.user = {
        fullname:data.fullname,
        email:data.email,
        date_of_birth:data.date_of_birth,
        phone:data.phone,
        pic:data.pic,
        password:data.password,
      }
      this.form.setValue({
        fullname: this.user.fullname,
        email: this.user.email,
        date_of_birth: this.user.date_of_birth,
        phone: this.user.phone,
        image: this.user.pic
      })
      this.imagePreview = this.user.pic;
    })

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }




  onSaveProfile() {
    this.isShow = true
    if (this.form.invalid) {
      return;
    }
    this.authService.updateUserProfile(
      this.user.id,
      this.form.value,
      this.form.value.image
    ).subscribe(res => {
      this.pageNoticeService.setNotice('Üyelik bilgileriniz başarıyla değiştirildi!', 'primary');
    }, error => {
      if (error.status == 401) {
        this.pageNoticeService.setNotice('Bilgileri değiştirmeye yetkiniz bulunmuyor!', 'warn');
      } else {
        this.pageNoticeService.setNotice('Bilgilerinizi değiştirirken bir hata oluştu!', 'warn');
      }
    });;
  }

  ngOnDestroy() {
    this.isShow = false
  }


}


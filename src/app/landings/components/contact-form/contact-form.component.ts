import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '@common/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { map } from 'rxjs';

@Component({
  selector: 'sbpro-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @ViewChild('confirmationModal') confirmationModal!: TemplateRef<unknown>;

  @Input() submitText: string = 'Submit';
  @Input() title!: string;
  
  signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      comment: ['', [Validators.required]]
  });

  recaptcha: any = '';
  siteKey = environment.siteKey;

  constructor(
      private utilityService: UtilityService,
      private fb: FormBuilder,
      private modalService: NgbModal,
      private http: HttpClient,
      private router: Router
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {
      this.utilityService.AOS.init({
          disable: 'mobile',
          duration: 600,
          once: true,
      });
  }

  resolved(captchaResponse: string) {
      // captcha sends null when EXPIRED
      this.recaptcha = captchaResponse;

      if (this.recaptcha !== null)
      {
          console.log('resolved captcha with response: ' + this.recaptcha);
      }
      else
      {
          console.log('captcha is NULL !!!');
      }
  }
  onError(errorDetails: RecaptchaErrorParameters): void {
      console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  onExpired(errorDetails: RecaptchaErrorParameters): void {
      console.log(`reCAPTCHA EXPIRED session; details:`, errorDetails);
  }

  onSubmit() {
      const apiAddress = environment.apiUrl + `customersupport/sendusmessage`

      if (this.recaptchaControlInvalid)
      {
          return;
      }


      if (this.signupForm.status === 'VALID') {
          console.log('customer support service call -', apiAddress);
          this.http.post(apiAddress, this.signupForm.value).pipe(
              map((response: any) => {
                  return JSON.stringify(response);
              })
          ).subscribe(d => console.log('api-send message: ', d));

          this.modalService.open(this.confirmationModal).result.then(
              (result) => { this.closeSendMsgDialog(); },
              (reason) => { this.closeSendMsgDialog(); }
          );


      }

      for (const key in this.signupForm.controls) {
          const control = this.signupForm.controls[key];
          control.markAllAsTouched();
      }
  }

  closeSendMsgDialog(){
      this.router.navigateByUrl('/');
  }

  // Accessors

  get emailControl() {
      return this.signupForm.get('email') as FormControl;
  }

  get emailControlValid() {
      return this.emailControl.touched && !this.emailControlInvalid;
  }

  get emailControlInvalid() {
      return (
          this.emailControl.touched &&
          (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
      );
  }

  get firstNameControl() {
      return this.signupForm.get('firstName') as FormControl;
  }

  get firstNameControlValid() {
      return this.firstNameControl.touched && !this.firstNameControlInvalid;
  }

  get firstNameControlInvalid() {
      return this.firstNameControl.touched && this.firstNameControl.hasError('required');
  }

  get lastNameControl() {
      return this.signupForm.get('lastName') as FormControl;
  }

  get lastNameControlValid() {
      return this.lastNameControl.touched && !this.lastNameControlInvalid;
  }

  get lastNameControlInvalid() {
      return this.lastNameControl.touched && this.lastNameControl.hasError('required');
  }

  get companyControl() {
      return this.signupForm.get('company') as FormControl;
  }

  get companyControlValid() {
      return this.companyControl.touched && !this.companyControlInvalid;
  }

  get companyControlInvalid() {
      return this.companyControl.touched && this.companyControl.hasError('required');
  }

  get commentControl() {
      return this.signupForm.get('comment') as FormControl;
  }

  get commentControlValid() {
      return this.commentControl.touched && !this.commentControlInvalid;
  }

  get commentControlInvalid() {
      return this.commentControl.touched && this.commentControl.hasError('required');
  }

  get recaptchaControl() {
      return this.signupForm.get('recaptcha') as FormControl;
  }

  get recaptchaControlValid() {
      return !this.recaptchaControlInvalid;
  }

  get recaptchaControlInvalid() {
      return !this.recaptcha || this.recaptcha == null;
  }

}

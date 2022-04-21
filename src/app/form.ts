import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * フォームの一覧を アプリケーション全体で管理できるよう form.ts などで管理するほうがよいかも
 */

const passwordMatchValidator_form: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pass1 = control.get('password');
  const pass2 = control.get('password2');

  if (pass1.value === pass2.value) {
    return null;
  } else {
    return { passwordMatch: true };
  }
};

const passwordMatchValidator_input: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log(control.parent);
  if (!control.parent) {
    return { passwordMatch: true };
  }
  const pass1 = control.parent.get('password');
  const pass2 = control;

  if (pass1.value === pass2.value) {
    return null;
  } else {
    return { passwordMatch: true };
  }
};

export const makeAppForm = () => {
  return new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [
        Validators.required,
        passwordMatchValidator_input,
      ]),
    }
    // { validators: [passwordMatchValidator_form] }
  );
};

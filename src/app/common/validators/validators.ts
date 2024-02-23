import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ValidatorDateCompareMode } from './validators.typings';

export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueLen = control.value?.toString()?.trim().length;
    return valueLen ? null : { emptyStr: true };
  };
}

export function compareDatesValidator(
  firstControlName: string,
  secondControlName: string,
  compareMode: ValidatorDateCompareMode
): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const firstControlValue: Date = form.controls[firstControlName].value;
    const secondControlValue: Date = form.controls[secondControlName].value;
    switch (compareMode) {
      case ValidatorDateCompareMode.Equal:
        return firstControlValue === secondControlValue
          ? null
          : { dateCompareError: true };
      case ValidatorDateCompareMode.Less:
        return firstControlValue < secondControlValue
          ? null
          : { dateCompareError: true };
      case ValidatorDateCompareMode.More:
        return firstControlValue > secondControlValue
          ? null
          : { dateCompareError: true };
      case ValidatorDateCompareMode.LessOrEqual:
        return firstControlValue <= secondControlValue
          ? null
          : { dateCompareError: true };
      case ValidatorDateCompareMode.MoreOrEqual:
        return firstControlValue >= secondControlValue
          ? null
          : { dateCompareError: true };
    }
  };
}

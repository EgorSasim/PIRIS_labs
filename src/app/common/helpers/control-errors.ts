import { ValidationErrors } from '@angular/forms';
import { FormControlError } from '../typings/error.typings';

export function getControlErorMessage(errors: ValidationErrors): string {
  const err = Object.values(FormControlError).find((error) => !!errors[error]);
  return err ? err : 'error';
}

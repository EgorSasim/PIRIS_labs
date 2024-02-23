import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.typings';
import { ConvertToForm } from '../../../common/typings/form.typings';
import {
  PASSPORT_IDENTIFICATION_NUMBER_LENGTH,
  PASSPORT_NUMBER_LENGHT,
} from '../user.constants';
import { whiteSpaceValidator } from '../../../common/validators/validators';

@Injectable()
export class CreateUserModalBuilder {
  public createForm(): FormGroup<ConvertToForm<Required<User>>> {
    return new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
        Validators.pattern('[A-Za-z- ]*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
        Validators.pattern('[A-Za-z- ]*'),
      ]),
      middleName: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
        Validators.pattern('[A-Za-z- ]*'),
      ]),
      birthDate: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      passportSeries: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      passportNumber: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
        Validators.minLength(PASSPORT_NUMBER_LENGHT),
        Validators.maxLength(PASSPORT_NUMBER_LENGHT),
        Validators.pattern('^[0-9]*$'),
      ]),
      issuedBy: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      dateOfIssue: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      identificationNumber: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
        Validators.minLength(PASSPORT_IDENTIFICATION_NUMBER_LENGTH),
        Validators.maxLength(PASSPORT_IDENTIFICATION_NUMBER_LENGTH),
        Validators.pattern('^[a-zA-Z0-9]*$'),
      ]),
      placeOfBirth: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      actualResidenceCity: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      actualResidenceAddress: new FormControl('', [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      homePhoneNumber: new FormControl('', [
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),
      mobilePhoneNumber: new FormControl('', [
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),
      email: new FormControl('', Validators.email),
      workPlace: new FormControl(''),
      workPosition: new FormControl(''),
      martialStatus: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      citizenship: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      disability: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
      ]),
      pensionary: new FormControl(false, [whiteSpaceValidator()]),
      monthlyIncome: new FormControl(null, [
        Validators.required,
        whiteSpaceValidator(),
        Validators.pattern('^[0-9]*$'),
      ]),
      conscript: new FormControl(false, [whiteSpaceValidator()]),
    });
  }
}

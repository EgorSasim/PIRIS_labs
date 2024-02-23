import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConvertToForm } from '../../../../common/typings/form.typings';
import { CreditContract } from '../credit.typings';
import { getRandomNumber } from '../../../../common/helpers/random-values';
import { CREDIT_CONTRACT_SERIAL_NUMBER_LENGTH } from '../credit.constants';
import { compareDatesValidator } from '../../../../common/validators/validators';
import { ValidatorDateCompareMode } from '../../../../common/validators/validators.typings';
import { areContractFieldsAppropToChoosenCredit } from '../../../../common/validators/credit-validators';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateCreditModalBuilder {
  public createForm(): FormGroup<
    ConvertToForm<Required<Omit<CreditContract, 'id'>>>
  > {
    return new FormGroup(
      {
        serialNumber: new FormControl(
          {
            value: getRandomNumber(CREDIT_CONTRACT_SERIAL_NUMBER_LENGTH),
            disabled: true,
          },
          [Validators.required]
        ),
        credit: new FormControl(null, [Validators.required]),
        startDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required]),
        userId: new FormControl(null, [Validators.required]),
      },
      [
        compareDatesValidator(
          'startDate',
          'endDate',
          ValidatorDateCompareMode.Less
        ),
        compareDatesValidator(
          'endDate',
          'duration',
          ValidatorDateCompareMode.Less
        ),
        areContractFieldsAppropToChoosenCredit(),
      ]
    );
  }
}

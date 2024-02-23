import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConvertToForm } from '../../../../common/typings/form.typings';
import { DepositContract } from '../deposit.typings';
import { getRandomNumber } from '../../../../common/helpers/random-values';
import { DEPOSIT_CONTRACT_SERIAL_NUMBER_LENGTH } from '../deposit.constants';
import { compareDatesValidator } from '../../../../common/validators/validators';
import { ValidatorDateCompareMode } from '../../../../common/validators/validators.typings';
import { areContractFieldsAppropToChoosenDeposit } from '../../../../common/validators/deposit-validators';

@Injectable()
export class CreateDepositModalBuilder {
  public createForm(): FormGroup<
    ConvertToForm<Required<Omit<DepositContract, 'id'>>>
  > {
    return new FormGroup(
      {
        serialNumber: new FormControl(
          {
            value: getRandomNumber(DEPOSIT_CONTRACT_SERIAL_NUMBER_LENGTH),
            disabled: true,
          },
          [Validators.required]
        ),
        deposit: new FormControl(null, [Validators.required]),
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
        areContractFieldsAppropToChoosenDeposit(),
      ]
    );
  }
}

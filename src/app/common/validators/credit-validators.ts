import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ConvertToForm } from '../typings/form.typings';
import { getMonthDifference } from '../helpers/dates';
import { CreditContract } from '../../components/bank-account/credit/credit.typings';

export function areContractFieldsAppropToChoosenCredit(): ValidatorFn {
  return (
    form: FormGroup<ConvertToForm<Omit<CreditContract, 'id'>>>
  ): ValidationErrors | null => {
    const controls = form.controls;
    if (
      !controls['credit'].value ||
      !controls['startDate'].value ||
      !controls['endDate'].value ||
      !controls['amount'].value
    ) {
      return null;
    }

    const choosenDuration = getMonthDifference(
      controls.endDate.value,
      controls.startDate.value
    );

    if (
      choosenDuration < controls.credit.value.minDurationTime ||
      choosenDuration > controls.credit.value.maxDurationTime
    ) {
      return { invalidCreditDuration: true };
    }

    if (controls.amount.value < controls.credit.value.minAmount) {
      return { invalidCreditAmount: true };
    }

    return null;
  };
}

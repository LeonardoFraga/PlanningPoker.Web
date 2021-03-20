import { AbstractControl, FormGroup } from '@angular/forms';

export function commaSeparationValidator(control: AbstractControl): { [key: string]: boolean } | null {

    let cards = control.value.split(',');

    if (cards.length === 1) {
        return { 'commaSeparator': true };
    }
    return null;

}

export function cardsLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {

    let cards = control.value.replace(/\s/g, '').split(',');
    cards = cards.filter((entry) => { return entry.trim() != '' })

    if (cards.length < 2) {
        return { 'cardsMinLength': true };
    }
    return null;
}
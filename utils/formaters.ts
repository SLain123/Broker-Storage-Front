import { isInt } from 'utils/checkers';

export const moneyFormater = (price: string | number) => {
    let checkedPrice = price;
    if (!isInt(price)) {
        checkedPrice = (+price).toFixed(3);
    }

    return String(checkedPrice).replace(
        /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
        '$1' + ' ',
    );
};

export const dateFormater = (date: Date) => date.toISOString().split('T')[0];

export const moneyFormater = (price: string | number) => {
    return String(price).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};

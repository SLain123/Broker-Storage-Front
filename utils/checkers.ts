export const isInt = (n: number | string) => {
    return Number(n) === n && n % 1 === 0;
};

export function generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate = (_lengthString, minNumber, maxNumber) => {
  
    const randomString = generateRandomString(_lengthString);
    const randomNumber = generateRandomNumber(minNumber, maxNumber);

    const dynamicRoutePart = `${randomString}-${randomNumber}`;
    return dynamicRoutePart;
};
export default generate;
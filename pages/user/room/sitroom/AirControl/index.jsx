//import

export async function getServerSideProps(context) {
    const { query } = context;

    function generateRandomString(length) {
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

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomString = generateRandomString(100);
    const randomNumber = generateRandomNumber(1000, 9999);

    const dynamicRoutePart = `${randomString}-${randomNumber}`;

    if (!query.id) {
        return {
            redirect: {
                destination: `/user/room/sitroom/AirControl/${dynamicRoutePart}`,
                permanent: false
            }
        };
    }
}

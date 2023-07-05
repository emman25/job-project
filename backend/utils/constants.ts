export const generateToken = () => {
    const digits = "0123456789";
    let token = "";

    for (let i = 0; i < 6; i++) {
        token += digits[Math.floor(Math.random() * 10)];
    }

    return token;
};


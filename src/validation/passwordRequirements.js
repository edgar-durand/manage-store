const passwordRequirements = (password) => {
    const MIN = 5,
        MAX = 30;
    const notNumber = /^(?!.*\d).*$/;
    const CHAR = /^(?!.*[~,@#$%^&*\-_+=?/\\]).*$/;
    const notSpaces = /^(?!.*\s).*$/;
    let upperCase = false,
        justLetter = "";

    for (let i = 0; i < password.length; i++)
        if (notNumber.test(password[i]) && CHAR.test(password[i])) justLetter += password[i];

    for (let i = 0; i < justLetter.length; i++)
        if (justLetter[i] === justLetter[i].toUpperCase()) upperCase = true;

    return (

        password.length >= MIN &&
        password.length <= MAX &&
        notNumber.test(password) === false &&
        notSpaces.test(password) &&
        CHAR.test(password) === false &&
        upperCase
    );
};

export default passwordRequirements;

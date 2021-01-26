// eslint-disable-next-line import/no-anonymous-default-export
export default (input, state) => {
    const {mail, pass} = input;
    const {email, password} = state;
    return (
        mail === email &&
        pass === password
    )
}
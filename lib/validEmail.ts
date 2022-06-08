function emailIsValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
}

export default emailIsValid;

export function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 8;
}

export function areAllVarsFilled(...vars: any[]) {
  return vars.every((v) => v !== null && v !== undefined && v !== "");
}
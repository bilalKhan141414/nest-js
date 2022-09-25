import * as bcrypt from 'bcrypt';

export function encodePassword(password: string): string {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, SALT);
}

export function verifyPassword(
  rawPassword: string,
  hashPassword: string,
): boolean {
  return bcrypt.compareSync(rawPassword, hashPassword);
}

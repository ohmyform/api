import { AuthLoginResolver } from './auth.login.resolver';
import { AuthRegisterResolver } from './auth.register.resolver';

export const authServices = [
  AuthRegisterResolver,
  AuthLoginResolver,
]

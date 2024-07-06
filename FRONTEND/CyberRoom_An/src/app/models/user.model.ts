export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  lastName?: string;
  imagen?: string;
  balance?: number;
  dni?: string;
  phoneNumber?: string;
  age?: number;
  gender?: string;
}
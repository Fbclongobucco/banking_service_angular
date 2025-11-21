import { Account } from "../../account/entity/account";

export type Customer = {
  id: number;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  role?: string;
  account?: Account
}
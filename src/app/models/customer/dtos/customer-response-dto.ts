import { AccountResponseDTO } from "../../account/dtos/account-response-dto";

export type CustomerResponseDTO = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    account: AccountResponseDTO
  }



import { CardResponseDTO } from "../../card/dtos/card-response-dto";

export type AccountResponseDTO = {
    id: number;
    accountNumber: string;
    balance: number;
    creditLimit: number;
    pixKey: string;
    card: CardResponseDTO,
    customer?: {
        id: number;
        name: string;
        email: string;
        cpf: string;
        phone: string;
    } 
}













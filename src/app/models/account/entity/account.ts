import { Card } from "../../card/entity/card";

export type Account = {
    id: number;
    accountNumber: string;
    balance: number;
    creditLimit: number;
    pixKey: string;
    card: Card;
}
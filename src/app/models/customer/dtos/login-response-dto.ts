import { UserLoggedDTO } from "./userlogged-dto";

export type LoginResponseDTO = {
  token: string;
  refreshToken: string;
  userLogged: UserLoggedDTO
  }

import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
  id: string;
  name: string;
  email: string;
  active?: boolean;
  role: "USER" | "ADMIN";
  password: string;
}

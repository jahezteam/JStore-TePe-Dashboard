import { dropdown } from "app/pages/shared-module/Models/dropDown";
import { permission } from "../../permissions/Models/permission";
import { role } from "../../roles/Models/role";

export interface user {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  userName: string;
  email: string;
  nationality: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
  job: string;
  confirmPassword: string;
  isAdmin: boolean;
  isLoggedIn: boolean;

  roles: role[];
  permissions: permission[];
}

export interface systemUser {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: Date;
  job: string;
  confirmPassword: string;
  isAdmin: boolean;
  roles: dropdown[];
  permissions: dropdown[];
  nationality: string;
}
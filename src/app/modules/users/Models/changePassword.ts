export interface changePassword {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;

}

export interface resetPassword {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}

export interface changeUserPassword {
  newPassword: string;
  confirmedPassword: string;
}

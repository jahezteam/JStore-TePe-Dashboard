export interface Institution {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  phone: string;
  email: string;
  locationAr: string;
  locationEn: string;
  users?: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  nationality: string;
  phoneNumber: string;
  idNumber: string;
  job: string;
  isAdmin: boolean;
}

export enum InstitutionPermissions {
  CREATE = 'CreateInstitution',
  UPDATE = 'UpdateInstitution',
  DELETE = 'DeleteInstitution',
  LIST = 'InstitutionList',
  DETAILS = 'InstitutionDetails',
  FILTER = 'FilterInstitution',
  SEARCH = 'SearchInstitution',
  ASSIGN_USERS = 'AssigneUsersToInstitution',
}

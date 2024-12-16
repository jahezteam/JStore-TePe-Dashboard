export enum BranchPermissions {
  BranchList = 'BranchList',
  CreateBranch = 'CreateBranch',
  UpdateBranch = 'UpdateBranch',
  DeleteBranch = 'DeleteBranch',
  SearchBranch = 'SearchBranch',
  FilterBranch = 'FilterBranch',
  BranchDetails = 'BranchDetails',
}

export interface Branch {
  id: number;
  name: string;
  nameEn: string;
  isPrimary: boolean;
  address: string;
  addressEn: string;
  lat: number;
  long: number;
  email: string;
  phone: string;
  mobile: string;
  whatsApp: string;
  regionId: number;
  cityId: number;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  content: string;
}
export enum ContactPermissions {
  ContactUsMessageList = 'ContactUsMessageList',
  CreateContactUsMessage = 'CreateContactUsMessage',
  UpdateContactUsMessage = 'UpdateContactUsMessage',
  DeleteContactUsMessage = 'DeleteContactUsMessage',
  SearchContactUsMessage = 'SearchContactUsMessage',
  FilterContactUsMessage = 'FilterContactUsMessage',
  ContactUsMessageDetails = 'ContactUsMessageDetails',
}

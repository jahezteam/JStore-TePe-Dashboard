export interface Newsletter {
  id: number;
  email: string;
  isSubScribe?: boolean;
  isDeleted?: boolean;
  isActive?: boolean;
}

export enum NewsletterPermissions {
  NewsLetterList = 'NewsLetterList',
  CreateNewsLetter = 'CreateNewsLetter',
  UpdateNewsLetter = 'UpdateNewsLetter',
  DeleteNewsLetter = 'DeleteNewsLetter',
  SearchNewsLetter = 'SearchNewsLetter',
  FilterNewsLetter = 'FilterNewsLetter',
  NewsLetterDetails = 'NewsLetterDetails',
}

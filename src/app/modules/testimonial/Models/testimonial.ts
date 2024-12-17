export interface Testimonial {
  id: number;
  name: string;
  nameEn: string;
  jobTitle: string;
  jobTitleEn: string;
  alternateText: string;
  alternateTextEn: string;
  imageTitle: string;
  imageTitleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
}

export enum TestimonialPermissions {
  List = 'TestmonialList',
  Create = 'CreateTestmonial',
  Update = 'UpdateTestmonial',
  Delete = 'DeleteTestmonial',
  Search = 'SearchTestmonial',
  Filter = 'FilterTestmonial',
  Details = 'TestmonialDetails',
}

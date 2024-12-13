export interface Slider {
  id: number;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  description: string;
  descriptionEn: string;
  link: string;
  titleLink: string;
  titleLinkEn: string;
  image: any;
}

export enum SliderPermissions {
  SliderList = 'SliderList',
  CreateSlider = 'CreateSlider',
  UpdateSlider = 'UpdateSlider',
  DeleteSlider = 'DeleteSlider',
  SearchSlider = 'SearchSlider',
  FilterSlider = 'FilterSlider',
  SliderDetails = 'SliderDetails',
}

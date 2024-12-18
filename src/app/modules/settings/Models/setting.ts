export interface Setting {
  id: number;
  logo: any;
  logoEn: any;
  lightLogo: any;
  lightLogoEn: any;
  address: string;
  addressEn: string;
  name: string;
  nameEn: string;
  email: string;
  unifiedNumber: string;
  globalColor: string;
  globalDarkColor: string;
  secondaryColor: string;
  blackishColor: string;
  linkColor: string;
  linkHoverColor: string;
  gloablecolorDashboard: string;
  secondaryColorDashboard: string;
  facebook: string;
  twitter: string;
  instagram: string;
  snapchat: string;
  youtube: string;
  whatsapp: string;
  threads: string;
  tikTok: string;
  linkedIn: string;
  telegram: string;
  footerDescription: string;
  footerDescriptionEn: string;
  lat: number;
  long: number;
}

export enum SettingPermissions {
  List = 'SettingList',
  Update = 'UpdateSetting',
  Delete = 'DeleteSetting',
  Details = 'SettingDetails',
}

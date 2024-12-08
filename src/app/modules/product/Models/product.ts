
// export interface products {
//   id: number;
//   name: string,
//   code: string;
//   price: number;
//   notes: string;
//   isActive: boolean;
//   isDeleted: boolean;
//   productCoupons:any;
// }

export interface product {
  id: number;
  titleAr: string,
  titleEn: string;
  longDescriptionAr: string;
  longDescriptionEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  modelNumber:string;
  categoryId:string;
  isActive: boolean;
  isDeleted: boolean;
  colors:productColor[];
}
export interface productColor {
  id: number;
  unitPriceAr: string,
  unitPriceEn: string;
  imageName: string[];
  price: number;
  quantity: number;
  colorId:string
}
// export interface _products {
//   id: number;
//   name: string,
//   code: string;
//   price: number;
//   notes: string;
//   isActive: boolean;
//   isDeleted: boolean;
//   productCoupons:any;

// }

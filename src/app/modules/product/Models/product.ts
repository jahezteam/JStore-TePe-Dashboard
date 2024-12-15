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
  titleAr: string;
  titleEn: string;
  longDescriptionAr: string;
  longDescriptionEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  modelNumber: string;
  mainCategoryId?: any;
  categoryId?: any;
  isActive: boolean;
  isDeleted: boolean;
  features: productFeature[];
}
export interface productFeature {
  id: number;
  price: number;
  quantity: number;
  productId?: string;
  featureId: string;
  unitPriceAr?: number;
  unitPriceEn?: number;
  images: any[];
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

import { Image } from 'primeng/image';

export interface ProductFeatureTransfer {
  id: number;
  unitPriceAr: string;
  unitPriceEn: string;
  quantity: number;
  price: number;
  productId: number;
  featureId: number;
  images: Image[];
  product: ProductTransfer;
}
export interface ProductTransfer {
  id: number;
  titleAr: string;
  titleEn: string;
  longDescriptionAr: string;
  longDescriptionEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  modelNumber: string;
  categoryId: number;
  categoryNameAr: string;
  categoryNameEn: string;
  mainCategoryNameAr: string;
  mainCategoryNameEn: string;
  isDeleted: boolean;
  isActive: boolean;
}
export interface CompleteTransfer {
  institutionId: number;
  productFeatures: productFeaturesTransferType[];
}
export interface productFeaturesTransferType {
  productFeatureId: number;
  quantity: number;
  minimumQuantity: number;
}
export interface FilterType {
  isActive?: boolean;
  categoryId?: string | number;
  mainCategoryId?: string | number;
  productId?: string | number;
}

export enum TransferPermissions {
  LIST = 'ProductFeatureTransferList',
  SEARCH = 'SearchProductFeatureTransfer',
  FILTER = 'FilterProductFeatureTransfer',
  DETAILS = 'ProductFeatureTransferDetails',
}

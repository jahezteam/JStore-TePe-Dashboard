export class permissionsCollection {
  name: string = '';
  permissions: string[] = [] as string[];
}
export class allPermissions {
  role: permissionsCollection = new permissionsCollection();
  user: permissionsCollection = new permissionsCollection();
  couponPermissions: permissionsCollection = new permissionsCollection();
  Product: permissionsCollection = new permissionsCollection();
  Order: permissionsCollection = new permissionsCollection();
  mainCategories: permissionsCollection = new permissionsCollection();
  categories: permissionsCollection = new permissionsCollection();
  region: permissionsCollection = new permissionsCollection();
  featureType: permissionsCollection = new permissionsCollection();

  fillPermissions() {
    this.role.name = 'Roles';
    this.role.permissions = [
      'RoleList',
      'CreateRole',
      'UpdateRole',
      'DeleteRole',
      'SearchRole',
      'FilterRole',
      'RoleDetails',
    ];

    this.user.name = 'Users';
    this.user.permissions = [
      'UserList',
      'CreateUser',
      'UpdateUser',
      'DeleteUser',
      'SearchUser',
      'FilterUser',
      'UserDetails',
      'AssignToRole',
      'RemoveFromRole',
      'AdminDashboard',
      'ExportAllData',
      'SignUserOut',
    ];

    this.Product.name = 'Product';
    this.Product.permissions = [
      'ProductList',
      'CreateProduct',
      'UpdateProduct',
      'DeleteProduct',
      'SearchProduct',
      'FilterProduct',
      'ProductDetails',
      'AssignCoupon',
      'RemoveCoupon',
      'RefreshProducts',
    ];

    this.couponPermissions.name = 'Coupon';
    this.couponPermissions.permissions = [
      'CouponList',
      'CreateCoupon',
      'UpdateCoupon',
      'DeleteCoupon',
      'SearchCoupon',
      'FilterCoupon',
      'CouponDetails',
      'AssignToProduct',
      'RemoveFromProduct',
    ];

    this.Order.name = 'Order';
    this.Order.permissions = [
      'OrderList',
      'CreateOrder',
      'UpdateOrder',
      'DeleteOrder',
      'SearchOrder',
      'OrderDetails',
      'AddExtraFees',
      'AcceptOrder',
      'RejectOrder',
      'AttachToOrder',
      'MoveOrders',
    ];

    this.mainCategories.name = 'Main Categories';
    this.mainCategories.permissions = [
      'MainCategoryList',
      'CreateMainCategory',
      'UpdateMainCategory',
      'DeleteMainCategory',
      'SearchMainCategory',
      'FilterMainCategory',
      'MainCategoryDetails',
    ];

    this.categories.name = 'Categories';
    this.categories.permissions = [
      'CategoryList',
      'CreateCategory',
      'UpdateCategory',
      'DeleteCategory',
      'SearchCategory',
      'FilterCategory',
      'CategoryDetails',
    ];

    this.featureType.name = 'Feature Type';
    this.featureType.permissions = [
      'FeatureTypeList',
      'CreateFeatureType',
      'UpdateFeatureType',
      'DeleteFeatureType',
      'SearchFeatureType',
      'FilterFeatureType',
      'FeatureTypeDetails',
    ];

    this.region.name = 'Region';
  }
}

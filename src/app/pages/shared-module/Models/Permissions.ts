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
  featureType: permissionsCollection = new permissionsCollection();
  feature: permissionsCollection = new permissionsCollection();
  region: permissionsCollection = new permissionsCollection();
  city: permissionsCollection = new permissionsCollection();
  newsLetter: permissionsCollection = new permissionsCollection();
  contact: permissionsCollection = new permissionsCollection();
  branch: permissionsCollection = new permissionsCollection();
  slider: permissionsCollection = new permissionsCollection();
  about: permissionsCollection = new permissionsCollection();
  Questions: permissionsCollection = new permissionsCollection();

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

    this.feature.name = 'Feature';
    this.feature.permissions = [
      'FeatureList',
      'CreateFeature',
      'UpdateFeature',
      'DeleteFeature',
      'SearchFeature',
      'FilterFeature',
      'FeatureDetails',
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
    this.region.permissions = [
      'RegionList',
      'CreateRegion',
      'UpdateRegion',
      'DeleteRegion',
      'SearchRegion',
      'FilterRegion',
      'RegionDetails',
    ];

    this.city.name = 'City';
    this.city.permissions = [
      'CityList',
      'CreateCity',
      'UpdateCity',
      'DeleteCity',
      'SearchCity',
      'FilterCity',
      'CityDetails',
    ];

    this.newsLetter.name = 'NewsLetter';
    this.newsLetter.permissions = [
      'NewsLetterList',
      'CreateNewsLetter',
      'UpdateNewsLetter',
      'DeleteNewsLetter',
      'SearchNewsLetter',
      'FilterNewsLetter',
      'NewsLetterDetails',
    ];

    this.contact.name = 'Contact';
    this.contact.permissions = [
      'ContactUsMessageList',
      'CreateContactUsMessage',
      'UpdateContactUsMessage',
      'DeleteContactUsMessage',
      'SearchContactUsMessage',
      'FilterContactUsMessage',
      'ContactUsMessageDetails',
    ];

    this.branch.name = 'Branch';
    this.branch.permissions = [
      'BranchList',
      'CreateBranch',
      'UpdateBranch',
      'DeleteBranch',
      'SearchBranch',
      'FilterBranch',
      'BranchDetails',
    ];

    this.slider.name = 'Slider';
    this.slider.permissions = [
      'SliderList',
      'CreateSlider',
      'UpdateSlider',
      'DeleteSlider',
      'SearchSlider',
      'FilterSlider',
      'SliderDetails',
    ];

    this.about.name = 'About';
    this.about.permissions = [
      'AboutUsList',
      'CreateAboutUs',
      'UpdateAboutUs',
      'UpdateFeatureTitle',
      'UpdateGoalTitle',
      'DeleteAboutUs',
      'SearchAboutUs',
      'FilterAboutUs',
      'AboutUsDetails',
      'AboutUsFeatureList',
      'CreateAboutUsFeature',
      'UpdateAboutUsFeature',
      'DeleteAboutUsFeature',
      'SearchAboutUsFeature',
      'FilterAboutUsFeature',
      'AboutUsFeatureDetails',
      'AboutUsGoalList',
      'CreateAboutUsGoal',
      'UpdateAboutUsGoal',
      'DeleteAboutUsGoal',
      'SearchAboutUsGoal',
      'FilterAboutUsGoal',
      'AboutUsGoalDetails',
    ];

    this.Questions.name = 'Questions';
    this.Questions.permissions = [
      'QuestionTypeList',
      'CreateQuestionType',
      'UpdateQuestionType',
      'DeleteQuestionType',
      'SearchQuestionType',
      'FilterQuestionType',
      'QuestionTypeDetails',
      'QuestionList',
      'CreateQuestion',
      'UpdateQuestion',
      'DeleteQuestion',
      'SearchQuestion',
      'FilterQuestion',
      'QuestionDetails',
    ];
  }
}

export interface About {
  id: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  titleFeatureAr?: string;
  titleFeatureEn?: string;
  descriptionFeatureAr?: string;
  descriptionFeatureEn?: string;
  titleGoalAr?: string;
  titleGoalEn?: string;
  descriptionGoalAr?: string;
  descriptionGoalEn?: string;
  image: string;
  aboutUsFeacturers?: AboutUsFeacturers[];
  aboutUsGoals?: AboutUsGoals[];
}
export interface FeatureTitle {
  id: number;
  titleFeatureAr: string;
  titleFeatureEn: string;
  descriptionFeatureAr: string;
  descriptionFeatureEn: string;
}
export interface GoalTitle {
  id: number;
  titleGoalAr: string;
  titleGoalEn: string;
  descriptionGoalAr: string;
  descriptionGoalEn: string;
}

export interface AboutUsFeacturers {
  id: number;
  featurNameAr: string;
  featurNameEn: string;
  counter: number;
  aboutUsId: number;
}

export interface AboutUsSlider {
  id: number;
  images: any;
  aboutUsId: number;
}

export interface AboutUsGoals {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  image: any;
  aboutUsId: number;
}

export enum AboutPermissions {
  AboutUsList = 'AboutUsList',
  CreateAboutUs = 'CreateAboutUs',
  UpdateAboutUs = 'UpdateAboutUs',
  UpdateFeatureTitle = 'UpdateFeatureTitle',
  UpdateGoalTitle = 'UpdateGoalTitle',
  DeleteAboutUs = 'DeleteAboutUs',
  SearchAboutUs = 'SearchAboutUs',
  FilterAboutUs = 'FilterAboutUs',
  AboutUsDetails = 'AboutUsDetails',
  AboutUsFeatureList = 'AboutUsFeatureList',
  CreateAboutUsFeature = 'CreateAboutUsFeature',
  UpdateAboutUsFeature = 'UpdateAboutUsFeature',
  DeleteAboutUsFeature = 'DeleteAboutUsFeature',
  SearchAboutUsFeature = 'SearchAboutUsFeature',
  FilterAboutUsFeature = 'FilterAboutUsFeature',
  AboutUsFeatureDetails = 'AboutUsFeatureDetails',
  AboutUsGoalList = 'AboutUsGoalList',
  CreateAboutUsGoal = 'CreateAboutUsGoal',
  UpdateAboutUsGoal = 'UpdateAboutUsGoal',
  DeleteAboutUsGoal = 'DeleteAboutUsGoal',
  SearchAboutUsGoal = 'SearchAboutUsGoal',
  FilterAboutUsGoal = 'FilterAboutUsGoal',
  AboutUsGoalDetails = 'AboutUsGoalDetails',
  AboutUsQuestionList = 'AboutUsQuestionList',
  CreateAboutUsQuestion = 'CreateAboutUsQuestion',
  UpdateAboutUsQuestion = 'UpdateAboutUsQuestion',
  DeleteAboutUsQuestion = 'DeleteAboutUsQuestion',
  SearchAboutUsQuestion = 'SearchAboutUsQuestion',
  FilterAboutUsQuestion = 'FilterAboutUsQuestion',
  AboutUsQuestionDetails = 'AboutUsQuestionDetails',
}

export enum QuestionsPermissions {
  QuestionTypeList = 'QuestionTypeList',
  CreateQuestionType = 'CreateQuestionType',
  UpdateQuestionType = 'UpdateQuestionType',
  DeleteQuestionType = 'DeleteQuestionType',
  SearchQuestionType = 'SearchQuestionType',
  FilterQuestionType = 'FilterQuestionType',
  QuestionTypeDetails = 'QuestionTypeDetails',
  QuestionList = 'QuestionList',
  CreateQuestion = 'CreateQuestion',
  UpdateQuestion = 'UpdateQuestion',
  DeleteQuestion = 'DeleteQuestion',
  SearchQuestion = 'SearchQuestion',
  FilterQuestion = 'FilterQuestion',
  QuestionDetails = 'QuestionDetails',
}

export interface QuestionType {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface Question {
  id: number;
  questionBody: string;
  questionBodyEn: string;
  answerBody: string;
  answerBodyEn: string;
  questionTypeId: number;
}

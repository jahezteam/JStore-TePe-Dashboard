import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private ser: ApiCallerService) {}

  postQuestionType(model: any) {
    return this.ser.Create(model, '/QuestionType/CreateQuestionType');
  }
  getQuestionTypeById(id: number) {
    return this.ser.GetById('/QuestionType/GetQuestionTypeById?Id=' + id);
  }
  getQuestionTypeList() {
    return this.ser.GetWithFullUrl('/QuestionType/GetQuestionTypes');
  }
  getQuestionTypePagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/QuestionType/GetAllPagging',
      isSearch,
    );
  }
  getQuestionTypePaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/QuestionType/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  searchQuestionType(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/QuestionType/SearchPagging',
      isSearch,
    );
  }
  updateQuestionType(model: any) {
    return this.ser.Update(model, '/QuestionType/UpdateQuestionType');
  }
  deleteQuestionType(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/QuestionType/DeleteQuestionType?Id=' + id,
    );
  }

  postQuestion(model: any) {
    return this.ser.Create(model, '/Question/CreateQuestion');
  }
  getQuestionById(id: number) {
    return this.ser.GetById('/Question/GetQuestionById?Id=' + id);
  }
  getQuestionList() {
    return this.ser.GetWithFullUrl('/Question/GetQuestions');
  }
  getQuestionPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Question/GetAllPagging', isSearch);
  }
  getQuestionPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/Question/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  searchQuestion(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Question/SearchPagging', isSearch);
  }
  updateQuestion(model: any) {
    return this.ser.Update(model, '/Question/UpdateQuestion');
  }
  deleteQuestion(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/Question/DeleteQuestion?Id=' + id,
    );
  }
}

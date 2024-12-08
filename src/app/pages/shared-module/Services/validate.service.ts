import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ValidateService {
  private formKeys: string[] = [] as string [];
  private formFlags :boolean[]=[] as boolean [];
  public validStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() {
  }

  registerForm(keys:string[]) {
    this.formKeys = [];
    this.formKeys = keys;
    this.prepareFormFlags();
  }
  extendForm(keys:string[]) {
    for (const  key of keys) {
      this.formKeys.push(key);
      this.formFlags[key as any] = false;
    }
  }
deleteKeys(keys:string[]) {
      for (const  key of keys) {
        const index: number = this.formKeys.indexOf(key);
        if (index !== -1) 
            this.formKeys.splice(index, 1);
        }
}
  private prepareFormFlags() {
    this.formFlags = [];
    for (const  key of this.formKeys) {
      this.formFlags[key as any] = false;
    }
  }
  updateFormFlag(key: any, value: boolean) {
    this.formFlags[key] = value;
    this.checkValidation();
  }
  private checkValidation() {
    let status = true;
    for (const key of this.formKeys) {
      if (this.formFlags[key as any] === false) {
        status = false;
        break;
      }
    }
    this.validStatus.next(status);
  }
}

import { picklist } from "./pickList";

export interface Resize{
  height:number,
  width:number,
  algorithm:picklist;
  groupId:number,
  isAll:boolean,
  isTemp:boolean,
  isImage:boolean;
  imageName:string;
  folderName:string;
}

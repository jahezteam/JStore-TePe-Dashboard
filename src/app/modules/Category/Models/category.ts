import { permission } from "../../permissions/Models/permission";

export interface category{
    id:number;
    name:string;
    description:string;
    mainCategoryId:string;
}
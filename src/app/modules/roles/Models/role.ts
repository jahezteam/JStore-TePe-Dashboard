import { permission } from "../../permissions/Models/permission";

export interface role{
    id:number;
    roleName:string;
    permissions:permission[];
}
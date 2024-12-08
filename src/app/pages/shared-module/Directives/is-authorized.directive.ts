import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Directive({
  selector: '[appIsAuthorized]'
})
export class IsAuthorizedDirective {

  constructor(  private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permService:NgxPermissionsService) { }

    private hasPermission = false;

    @Input() set appIsAuthorized(permission: string) {
      this.permService.permissions$.subscribe((permissions) => {
        if(permissions[permission]?.name!=permission)
        {
          this.viewContainer.clear();

         this.hasPermission=false;

        }
        else{
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasPermission=true;

        }
        });
    }

}

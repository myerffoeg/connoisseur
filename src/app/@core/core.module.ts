import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ConnoisseurService } from './services';

@NgModule({
  imports: [

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded the import must be in the AppModule only.');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ConnoisseurService
      ]
    };
  }
}

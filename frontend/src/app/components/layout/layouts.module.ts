import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HeaderComponent } from './default-layout/header/header.component';
import { SidebarComponent } from './default-layout/sidebar/sidebar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './default-layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../loader/loader.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient  } from '@angular/common/http';

const components = [
  DefaultLayoutComponent,
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  AuthLayoutComponent,
  LoaderComponent,
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule,   TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }) ,],
  declarations: components,
  exports: components,
})
export class LayoutsModule {}

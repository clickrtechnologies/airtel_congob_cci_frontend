import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { DeactivateComponent } from './features/deactivate/deactivate.component';
import { SetRbtComponent } from './features/set-rbt/set-rbt.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SearchTonesComponent } from './features/search-tones/search-tones.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule , MatPaginatorIntl} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CustomPaginator } from './custom-paginator';
import { BulkActivationComponent } from './features/bulk-activation/bulk-activation.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DeactivateComponent,
    SetRbtComponent,
    SearchTonesComponent,
    BulkActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
  MatPaginatorModule,
  MatButtonModule
  ],
  providers: [
    { provide: MatPaginatorIntl,
    useClass: CustomPaginator
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

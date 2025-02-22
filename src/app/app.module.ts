import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OfficersComponent } from './officers/officers.component';
import { routes } from './app.routes';
import { UiButtonComponent } from './components/UI/button/ui-button.component';
import { NgClass } from '@angular/common';
import { LayoutContainerComponent } from './components/layout/layout-container/layout-container.component';
import { UiTitleComponent } from './components/UI/title/ui-title.component';
import { UiContainerComponent } from './components/UI/container/ui-container.component';
import { UiInputComponent } from './components/UI/input/ui-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiListComponent } from './components/UI/list/ui-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiTextareaComponent } from './components/UI/textarea/ui-textarea.component';
import { UiTableComponent } from './components/UI/table/ui-table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { UiRankComponent } from './components/UI/rank/ui-rank.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { UiLoadingComponent } from './components/UI/loading/ui-loading.component';
import { TableItemComponent } from './components/UI/table/table-item/table-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    AppComponent,       
    LayoutComponent,    
    OfficersComponent,
    UiButtonComponent,
    LayoutContainerComponent,
    UiTitleComponent,
    UiContainerComponent,
    UiInputComponent,
    UiListComponent,
    UiTextareaComponent,
    UiTableComponent,
    UiRankComponent,
    UiLoadingComponent,
    TableItemComponent,
    ModalComponent,
    ProfileComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,     
    RouterOutlet,
    NgClass,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([ AuthInterceptor, LoadingInterceptor ])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
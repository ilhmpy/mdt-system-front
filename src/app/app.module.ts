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
    UiListComponent
  ],
  imports: [
    BrowserModule,     
    RouterOutlet,
    NgClass,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
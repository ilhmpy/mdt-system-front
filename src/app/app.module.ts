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

@NgModule({
  declarations: [
    AppComponent,       
    LayoutComponent,    
    OfficersComponent,
    UiButtonComponent,
    LayoutContainerComponent,
  ],
  imports: [
    BrowserModule,     
    RouterOutlet,
    NgClass,
    RouterModule.forRoot(routes)  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
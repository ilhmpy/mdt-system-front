import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OfficersComponent } from './officers/officers.component';
import { routes } from './app.routes';
import { UiButtonComponent } from './components/UI/button/ui-button.component';
import { NgClass } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,       
    LayoutComponent,    
    OfficersComponent,
    UiButtonComponent
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
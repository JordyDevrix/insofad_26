import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../auth/admin/admin.component';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppComponent,
    AdminComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

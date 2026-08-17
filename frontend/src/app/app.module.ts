import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyLostItemsComponent } from './my-lost-items/my-lost-items.component';
import { CreateLostItemComponent } from './create-lost-item/create-lost-item.component';
import { CreateFoundItemComponent } from './create-found-item/create-found-item.component';
import { MyFoundItemsComponent } from './my-found-items/my-found-items.component';
import { ViewMatchesComponent } from './view-matches/view-matches.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { MessageArchiveComponent } from './message-archive/message-archive.component';
import { ManualFoundItemsComponent } from './manual-found-items/manual-found-items.component';
import { FoundItemDetailsComponent } from './found-item-details/found-item-details.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MyLostItemsComponent,
    CreateLostItemComponent,
    CreateFoundItemComponent,
    MyFoundItemsComponent,
    ViewMatchesComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    MessageCenterComponent,
    MessageArchiveComponent,
    ManualFoundItemsComponent,
    FoundItemDetailsComponent,
    AdminListComponent,
    AdminDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

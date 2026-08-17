import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MyLostItemsComponent } from './my-lost-items/my-lost-items.component';
import { CreateLostItemComponent } from './create-lost-item/create-lost-item.component';

import { MyFoundItemsComponent } from './my-found-items/my-found-items.component';
import { CreateFoundItemComponent } from './create-found-item/create-found-item.component';

import { ViewMatchesComponent } from './view-matches/view-matches.component';

import { AboutComponent } from './about/about.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { MessageCenterComponent } from './message-center/message-center.component';
import { MessageArchiveComponent } from './message-archive/message-archive.component';
import { ManualFoundItemsComponent } from './manual-found-items/manual-found-items.component';
import { FoundItemDetailsComponent } from './found-item-details/found-item-details.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';

const routes: Routes = [

// Home
{
path: '',
component: HomeComponent
},

// Authentication
{
path: 'login',
component: LoginComponent
},

{
path: 'register',
component: RegisterComponent
},

{
path: 'admin-login',
component: AdminLoginComponent
},

// About
{
path: 'about',
component: AboutComponent
},

// User Dashboard
{
path: 'dashboard',
component: DashboardComponent
},

// Lost Items
{
path: 'mylostitems',
component: MyLostItemsComponent
},

{
path: 'createlostitem',
component: CreateLostItemComponent
},

// Found Items
{
path: 'myfounditems',
component: MyFoundItemsComponent
},

{
path: 'create-found-item',
component: CreateFoundItemComponent
},

// AI Matches
{
path: 'view-matches/:id',
component: ViewMatchesComponent
},

// Messages / Complaints
{
path: 'messages',
component: MessageCenterComponent
},

// Admin
{
path: 'admin-dashboard',
component: AdminDashboardComponent
},
{
  path:'message-archive',
  component:MessageArchiveComponent
},
{
  path:'manual-found-items',
  component:ManualFoundItemsComponent
},
{
  path:'found-item-details/:id',
  component:FoundItemDetailsComponent
},
{
path:'admin-list',
component:AdminListComponent
},

{
path:'admin-details/:id',
component:AdminDetailsComponent
},
// Fallback
{
path: '**',
redirectTo: ''
}

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './paged/home/home.component';
import { CategoriesComponent } from './paged/categories/categories.component';
import { SubcategoriesComponent } from './paged/subcategories/subcategories.component';
import { PromptComponent } from './paged/prompt/prompt.component';
import { authGuard } from './core/guards/auth.guard';
import { HistoryComponent } from './paged/history/history.component';
import { HistoryDetailComponent } from './paged/history/history-detail.component';
import { adminGuard } from './core/guards/admin.guard';
import { AdminUsersComponent } from './paged/admin/admin-users.component';
import { AdminUserHistoryComponent } from './paged/admin/admin-user-history.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthComponent },

  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'categories/:id/sub', component: SubcategoriesComponent, canActivate: [authGuard] },
  { path: 'prompt/:categoryId/:subId', component: PromptComponent, canActivate: [authGuard] },


  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'history/:id', component: HistoryDetailComponent, canActivate: [authGuard] },

  { path: 'admin/users', component: AdminUsersComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/users/:id/history', component: AdminUserHistoryComponent, canActivate: [authGuard, adminGuard] },



  { path: '**', redirectTo: '' },
];
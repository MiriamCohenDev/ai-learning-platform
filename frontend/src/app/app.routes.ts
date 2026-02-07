import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './paged/home/home.component';
import { CategoriesComponent } from './paged/categories/categories.component';
import { SubcategoriesComponent } from './paged/subcategories/subcategories.component';
import { PromptComponent } from './paged/prompt/prompt.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'categories/:id/sub', component: SubcategoriesComponent, canActivate: [authGuard] },
  { path: 'prompt', component: PromptComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
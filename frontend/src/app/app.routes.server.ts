import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'categories/:id/sub',
    renderMode: 0
  },
  {
    path: 'prompt/:categoryId/:subId',
    renderMode: 0
  },
  {
    path: 'history',
    renderMode: 0
  },
  {
    path: 'history/:id',
    renderMode: 0
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

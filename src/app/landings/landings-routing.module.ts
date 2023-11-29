
/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { LandingsModule } from './landings.module';

/* Containers */
import * as landingsContainers from './containers';

/* Guards */
import * as landingsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    data: {
      title: 'Repsoft',
    } as SBRouteData,
    component: landingsContainers.DesktopAppComponent,
  },

  {
    path: 'contact',
    data: {
      title: 'Contact Us',
    } as SBRouteData,
    component: landingsContainers.ContactComponent,
  },
  {
    path: 'pricing',
    data: {
      title: 'Pricing',
    } as SBRouteData,
    component: landingsContainers.PricingComponent,
  },
  {
    path: 'about-us',
    data: {
      title: 'About Us',
    } as SBRouteData,
    component: landingsContainers.AboutComponent,
  },
];

@NgModule({
  imports: [LandingsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class LandingsRoutingModule { }

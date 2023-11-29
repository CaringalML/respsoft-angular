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
        canActivate: [],
        data: {
            title: 'Repsoft Analytics',
        } as SBRouteData,
        component: landingsContainers.HomeComponent,
    },
    {
        path: 'contact',
        canActivate: [],
        data: {
            title: 'Contact - Repsoft Analytics',
        } as SBRouteData,
        component: landingsContainers.MyContact,
    },
    {
        path: 'contact/sendmessage',
        canActivate: [],
        data: {
            title: 'Send us a message - Repsoft Analytics',
        } as SBRouteData,
        component: landingsContainers.LeadCaptureComponent,
    },
    {
        path: 'whoweare',
        canActivate: [],
        data: {
            title: 'Who We Are - Repsoft Analytics',
        } as SBRouteData,
        component: landingsContainers.WhoWeAreComponent,
    },
];

@NgModule({
    imports: [LandingsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class LandingsRoutingModule {}

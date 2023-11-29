import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';

@Component({
    selector: 'sbpro-who-we-are',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './whow-we-are.component.html',
    styleUrls: ['inner-page.component.scss'],
})
export class WhoWeAreComponent implements OnInit, AfterViewInit {
    constructor(private utilityService: UtilityService) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.utilityService.AOS.init({
            disable: 'mobile',
            duration: 600,
            once: true,
        });
    }
}

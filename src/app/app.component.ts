import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  location: Location | undefined;

  constructor(public router: Router, private titleService: Title, private meta: Meta) {

    this.createMetaTag();

    this.router.events
      .pipe(filter((event) => event instanceof ChildActivationEnd))
      .subscribe((event) => {
        let snapshot = (event as ChildActivationEnd).snapshot;

        while (snapshot.firstChild !== null) {
          snapshot = snapshot.firstChild;
        }
        this.titleService.setTitle(snapshot.data.title || 'SB UI Kit Pro Angular');
      });

  }

  ngOnInit(): void {
    // console.log(' --->> href ', window.location.href );
    // console.log(' --->> protocol ', window.location.protocol );
    // if (environment.production) {
    //     if (location.protocol === 'http:') {
    //       window.location.href = location.href.replace('http', 'https');
    //     }
    // }


  }

  createMetaTag() {
    // Add a single meta tag
    this.meta.addTag({ name: 'description', content: 'Empower Your Early Childhood Education (ECE) Business with Real-Time Financial Insights' });
    this.meta.addTag({ name: 'title', content: 'Repsoft Analytics' });

    // Add multiple meta tags
    this.meta.addTags([
      { name: 'keywords', content: 'Repsoft, Analytics, ECE, Early Childhood Education, Education, Software' },
      { property: 'og:title', content: 'Analytics' },
      { property: 'og:description', content: 'Empower Your Early Childhood Education (ECE) Business with Real-Time Financial Insights' },
      { property: 'og:image', content: 'https://myrepsoft.com/assets/meta.png'},
      { property: 'og:url', content: 'https://myrepsoft.com/'},
      { property: 'og:type', content: 'website'},
      { property: 'og:site_name', content: 'Repsoft Analytics'},
      { property: 'linkedin:creator', content: 'https://www.linkedin.com/company/myrepsoft/'}
    ]);
  }
}

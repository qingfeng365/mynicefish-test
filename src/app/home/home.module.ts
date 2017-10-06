import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SocialChannelComponent } from './social-channel/social-channel.component';
import { SitestatComponent } from './sitestat/sitestat.component';
import { OnlineContactComponent } from './online-contact/online-contact.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SocialChannelComponent,
    SitestatComponent,
    OnlineContactComponent
  ]
})
export class HomeModule { }

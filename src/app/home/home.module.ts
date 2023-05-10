import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {LeaderboardComponent} from "../leaderboard/leaderboard.component";
import {PlayerComponent} from "../player/player.component";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {ListboxModule} from 'primeng/listbox';
import {FormsModule} from "@angular/forms";
import {DropdownModule} from 'primeng/dropdown';
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    LeaderboardComponent,
    PlayerComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HomeRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    ListboxModule,
    FormsModule,
    DropdownModule
  ]
})
export class HomeModule { }

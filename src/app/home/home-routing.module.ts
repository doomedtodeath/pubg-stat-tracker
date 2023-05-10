import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerComponent} from "../player/player.component";
import {LeaderboardComponent} from "../leaderboard/leaderboard.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LeaderboardComponent
      },
      {
        path: 'player',
        pathMatch: 'full',
        component: PlayerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

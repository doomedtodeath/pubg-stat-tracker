import { Component, OnInit } from '@angular/core';
import {PubgService} from "../services/pubg.service";
import { sortBy } from "lodash";
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  allData = [];
  data: any = [];

  constructor(private pubgService: PubgService) {
    this.pubgService.seasonEvent.subscribe((seasonList) => {
      if (seasonList) {
        this.fetchLeaderBoard();
      }
    });
  }

  ngOnInit(): void {
  }

  fetchLeaderBoard(){
    this.pubgService.fetchLeaderBoard().then((res) => {
      this.allData = res.data.included;
      this.data = sortBy(this.allData, (data: any) => data.attributes.rank).slice(0,10);
      console.log(this.data);
    })
  }

}

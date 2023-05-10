import { Component, OnInit } from '@angular/core';
import {PubgService} from "../services/pubg.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playerSearch = '';

  constructor(private pubgService: PubgService, private _router: Router) { }

  ngOnInit(): void {
  }

  searchPlayer(e: any){
    if (e.code === 'Enter') {
      this.pubgService.fetchPlayer(this.playerSearch).then((result) => {
        if (result.data && result.data.data && result.data.data[0] && result.data.data[0].id) {
          console.log(result.data.data[0]);
          this.pubgService.playerName = result.data.data[0].attributes.name;
          this.pubgService.matchList = result.data.data[0].relationships.matches.data;
          console.log(this.pubgService.matchList);
          this._router.navigate(['player'], {queryParams: {playerId: result.data.data[0].id, playerName: result.data.data[0].attributes.name}})
        } else {
          // Not found
        }
      }, ()=>{
        this._router.navigate(['player'], {queryParams: {notFound: true}})
      });
    }
  }

}

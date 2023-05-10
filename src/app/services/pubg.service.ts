import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlatformRegion, Player, PubgAPI, Season, SeasonsPubgAPI, SeasonState} from "pubg-typescript-api";
import {environment} from "../../environments/environment";
import {GameMode} from "pubg-typescript-api/shared/constants";
import axios from 'axios'
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import { map, filter } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class PubgService {

  api: PubgAPI = new PubgAPI(environment.pubgApiKey, PlatformRegion.PC_EU);
  seasonId = '';
  playerName = ''
  seasonList: any = [];
  seasonEvent = new BehaviorSubject(null);
  seasonObj: any = [];
  matchList: any = [];

  constructor(private http: HttpClient, private _router: Router) {
    this.initialize();
  }

  initialize(){
    this.api = new PubgAPI(environment.pubgApiKey, PlatformRegion.PC_EU);
    axios.get(`https://api.pubg.com/shards/${PlatformRegion.STEAM}/seasons`,{headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${environment.pubgApiKey}`,}}).then((res)=>{
      console.log(res);
      this.seasonObj = res;
      this.seasonList = map(filter(res.data.data, (season) => season.id.includes('pc')), (season) =>
      {
        const name = season.id.split('-');
        if (season.attributes.isCurrentSeason){
          console.log(season.id);
          this.seasonId = season.id;
        }
        return { _id: season.id,
          currentSeason: season.attributes.isCurrentSeason,
          name: 'Season ' + name[name.length-1]
        }
      });
      console.log(this.seasonId);
      this.onGetSeasons();
    });
  }

  fetchLeaderBoard(){
    return axios.get(`https://api.pubg.com/shards/${PlatformRegion.PC_AS}/leaderboards/${this.seasonId}/${GameMode.SQUAD_FPP}?page[number]=0`,{headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${environment.pubgApiKey}`,}})
  }

  fetchPlayer(playerName: string){
    return axios.get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${environment.pubgApiKey}`,
      }
    })
  }

  fetchPlayerLifetimeStats(playerId : string){
    return axios.get(`https://api.pubg.com/shards/steam/players/${playerId}/seasons/lifetime`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${environment.pubgApiKey}`,
      }
    })
  }

  fetchPlayerSeasonStats(playerId: string){
    return axios.get(`https://api.pubg.com/shards/steam/players/${playerId}/seasons/${this.seasonId}/ranked`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${environment.pubgApiKey}`,
      }
    })
  }

  getMatch(matchId: string): Promise<any>{
    return axios.get(`https://api.pubg.com/shards/steam/matches/${matchId}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${environment.pubgApiKey}`,
      }
    })
  }

  onGetSeasons(){
    console.log(this.seasonId);
    this.seasonEvent.next(this.seasonList);
  }
}

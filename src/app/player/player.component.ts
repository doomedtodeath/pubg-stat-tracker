import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {PubgService} from "../services/pubg.service";
import {round, map, find, cloneDeep, sortBy} from 'lodash';
import {forkJoin, Observable} from "rxjs";
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerId = '';
  index: number = 0;
  contextMenu = [{'name': 'Ranked Stats', 'value': 0}, {'name': 'Lifetime Stats', 'value': 1}, {'name': 'Matches', 'value': 2}];
  currentSeasonStats: any = {};
  currentSeasonStatsMapping: any = {
    "currentTier": "Current Tier",
    "currentRankPoint": "Current Rank Point",
    "bestTier": "Best Tier",
    "bestRankPoint": "Best Rank Point",
    "roundsPlayed": "Rounds Played",
    "avgRank": "Avg Rank",
    "avgSurvivalTime": "Avg. Survival Time",
    "top10Ratio": "Top 10 Ratio",
    "winRatio": "Win Ratio",
    "assists": "Assists",
    "wins": "Wins",
    "kda": "KDA",
    "kdr": "KDR",
    "kills": "Kills",
    "deaths": "Deaths",
    "roundMostKills": "Round Most Kills",
    "longestKill": "Longest Kill",
    "headshotKills": "Headshot Kills",
    "headshotKillRatio": "Headshot Kill Ratio",
    "damageDealt": "Damage Dealt"
}
  currentSeasonStat = [
      "currentTier",
      "currentRankPoint",
      "bestTier",
      "bestRankPoint",
      "roundsPlayed",
      "avgRank",
      "avgSurvivalTime",
      "top10Ratio",
      "winRatio",
      "assists",
      "wins",
      "kda",
      "kdr",
      "kills",
      "deaths",
      "roundMostKills",
      "longestKill",
      "headshotKills",
      "headshotKillRatio",
      "damageDealt",
  ]

  lifeTimeStats: any = {};
  lifeTimeStatsMapping: any = {
    "assists": "Assists",
    "boosts": "Boosts",
    "dBNOs": "dBNOs",
    "dailyKills": "Daily Kills",
    "dailyWins": "Daily Wins",
    "damageDealt": "Damage Dealt",
    "days": "Days",
    "headshotKills": "Headshot Kills",
    "heals": "Heals",
    "killPoints": "Kill Points",
    "kills": "Kills",
    "longestKill": "Longest Kill",
    "longestTimeSurvived": "Longest Time Survived",
    "losses": "Losses",
    "maxKillStreaks": "Max Kill Streaks",
    "mostSurvivalTime": "Most Survival Time",
    "rankPoints": "Rank Points",
    "rankPointsTitle": "Rank Points Title",
    "revives": "Revives",
    "rideDistance": "Ride Distance",
    "roadKills": "RoadKills",
    "roundMostKills": "Round Most Kills",
    "roundsPlayed": "Rounds Played",
    "suicides": "Suicides",
    "swimDistance": "Swim Distance",
    "teamKills": "TeamKills",
    "timeSurvived": "Time Survived",
    "top10s": "Top10s",
    "vehicleDestroys": "Vehicle Destroyed",
    "walkDistance": "Walk Distance",
    "weaponsAcquired": "Weapons Acquired",
    "weeklyKills": "Weekly Kills",
    "weeklyWins": "Weekly Wins",
    "winPoints": "Win Points",
    "wins": "Wins",
  }
  lifetTimeStat = [
      "assists",
      "boosts",
      "dBNOs",
      "dailyKills",
      "dailyWins",
      "damageDealt",
      "days",
      "headshotKills",
      "heals",
      "killPoints",
      "kills",
      "longestKill",
      "longestTimeSurvived",
      "losses",
      "maxKillStreaks",
      "mostSurvivalTime",
      "rankPoints",
      "rankPointsTitle",
      "revives",
      "rideDistance",
      "roadKills",
      "roundMostKills",
      "roundsPlayed",
      "suicides",
      "swimDistance",
      "teamKills",
      "timeSurvived",
      "top10s",
      "vehicleDestroys",
      "walkDistance",
      "weaponsAcquired",
      "weeklyKills",
      "weeklyWins",
      "winPoints",
      "wins"
  ]
  notFound = false;
  playerName = '';
  seasons = [];
  selectedSeason = '';
  playerDataNotFetched = true;
  gameModesLT: string[] = [];
  gameModesR: string[] = [];
  matchData: any[] = [];

  constructor(private router: ActivatedRoute, private pubgService: PubgService) {
    this.subscribeToRoutes();
    this.pubgService.seasonEvent.subscribe((seasonList) => {
      if (seasonList) {
        this.seasons = seasonList;
        this.selectedSeason = this.pubgService.seasonId;
        console.log(this.selectedSeason);
        if (this.playerDataNotFetched){
          this.fetchPlayerData();
        }
      }
    });
  }

  ngOnInit(): void {
  }

  subscribeToRoutes() {
    this.router.queryParams.subscribe((qparams) => {
      if (qparams['playerId']) {
        console.log(qparams['playerId']);
        this.playerId = qparams['playerId'];
        this.playerName = qparams['playerName'];
        if (this.selectedSeason) {
          this.fetchPlayerData();
        }
      }
      if (qparams['notFound']) {
        this.notFound = true;
      }
    })
  }

  fetchPlayerData(fetch?: string) {
    this.pubgService.fetchPlayerSeasonStats(this.playerId).then((res) => {
      console.log(res);
      this.gameModesR = Object.keys(res.data.data.attributes.rankedGameModeStats);
      this.currentSeasonStats = res.data.data.attributes.rankedGameModeStats;
      this.playerDataNotFetched = false;
    })
    if (!fetch) {
      this.pubgService.fetchPlayerLifetimeStats(this.playerId).then((res) => {
        console.log(res);
        this.gameModesLT = Object.keys(res.data.data.attributes.gameModeStats);
        this.lifeTimeStats = res.data.data.attributes.gameModeStats;
        this.playerDataNotFetched = false;
        this.getMatches();
      })
    }
  }

  roundOff(num: number){
    return round(num, 2).toString();
  }

  seasonChange(){
    console.log(this.selectedSeason);
    this.pubgService.seasonId = this.selectedSeason;
    this.fetchPlayerData('seasonStats');
  }

  getMatches() {
    console.log(this.pubgService.matchList);
    let obs: Promise<any>[] = [];
    for (let i = 1; i < 6; i++){
      const m: any = this.pubgService.matchList[this.pubgService.matchList.length - i];
      console.log('$$$', m);
      obs.push(this.pubgService.getMatch(m.id));
    }
    Promise.all(obs).then((matches)=> {
      console.log(matches);
      if (matches) {
        this.matchData = map(matches, (match) => {
          const player = find(match.data.included, (res) => {
            return res.type === 'participant' && res.attributes.stats.playerId === this.playerId
          });
          console.log(player);
          return {
            createdAt: match.data.data.attributes.createdAt,
            duration: match.data.data.attributes.duration,
            matchType: match.data.data.attributes.matchType,
            gameMode: match.data.data.attributes.gameMode,
            mapName: match.data.data.attributes.mapName,
            kills: player.attributes.stats.kills,
            damageDealt: player.attributes.stats.damageDealt,
            assists: player.attributes.stats.assists,
            winPlace: player.attributes.stats.winPlace,
          }
        });
      }
    });
  }

}

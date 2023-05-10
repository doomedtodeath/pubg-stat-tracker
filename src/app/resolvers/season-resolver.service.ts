// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import {PubgService} from "../services/pubg.service";
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SeasonResolverService implements Resolve<any> {
//   constructor(private pubgService: PubgService) {}
//   resolve(route: ActivatedRouteSnapshot): Observable<any> {
//     console.log('Called Get Product in resolver...', route);
//     if (this.pubgService.seasonId){
//       return new Observable((obs) => {obs.complete()})
//     }
//   }
// }

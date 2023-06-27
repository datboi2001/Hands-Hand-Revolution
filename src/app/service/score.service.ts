import { Injectable } from '@angular/core';
import { Score } from '../score';


@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private static leaderBoard: Score[] = [];
  constructor() {
    if (ScoreService.leaderBoard.length == 0){
      // Load from localStorage
        let scores = localStorage.getItem("leaderBoard");
        if (scores != null){
            const leaderBoard = JSON.parse(scores);
          leaderBoard.forEach((element: { score: any; date: string}) => {
            ScoreService.leaderBoard.push({score: element.score, date: new Date(element.date)}); 
          });
        }
    }
  }


    public addScore(score: number, date: Date): void{
      ScoreService.leaderBoard.push({score: score, date: date})
      // Sort by latest date
        this.saveLeaderBoard();
    }

    public getLeaderBoard(): Score[]{
        return ScoreService.leaderBoard;
    }


    private saveLeaderBoard(): void{
        localStorage.setItem("leaderBoard", JSON.stringify(ScoreService.leaderBoard));
    }
}


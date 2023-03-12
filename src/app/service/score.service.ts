import { Injectable } from '@angular/core';


interface Score{
  date: Date;
  score: number;
}

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
            ScoreService.leaderBoard = JSON.parse(scores) as Score[];
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


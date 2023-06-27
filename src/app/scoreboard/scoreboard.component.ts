import { Component, Input, OnInit } from '@angular/core';
import { ScoreService} from '../service/score.service';
import { Score } from '../score';
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  @Input() newScore: number;
  topScores: Score[] = [];
  top5Scores: Score[] = [];
  last5Scores: Score[] = []; 
  formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
  constructor(private scoreService: ScoreService) {
    this.displayTopScores();
   }

  ngOnInit(): void {
    
  }

  public displayTopScores(): void {
    this.topScores = this.scoreService.getLeaderBoard();
    while (this.topScores.length < 10) {
      this.topScores.push({score: 0, date: new Date()});
    }
    this.topScores = this.topScores.sort((a, b) => (a.score < b.score) ? 1 : -1);
    this.topScores = this.topScores.slice(0, 10);
    this.top5Scores = this.topScores.slice(0, 5);
    this.last5Scores = this.topScores.slice(5, 10);
  }

}



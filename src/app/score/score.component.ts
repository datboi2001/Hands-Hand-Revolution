import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  
  @Input() score: number = 0; 
  @Input() level: number = 1;
  @Input() lives: number = 3;

  public getHearts(): string{
    let hearts: string = "";
    for (let i = 0; i < this.lives; i++){
      hearts += "❤️";
    }
    return hearts;
  }

  constructor() { }

  ngOnInit(): void {
  }
}

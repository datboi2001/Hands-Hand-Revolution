import { Component, OnInit, OnDestroy } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {
  gesture: String = "";
  started: boolean = false;
  public currentImage: string = "";
  public score = 0;
  private SECOND: number = 2000;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  public lives: number = 3;
  public level: number = 0;
  public levelProgress: number = 0;
  public correct: boolean = false;
  public counter: number = 100;
  public maxcounter: number = 100;

  OneHandGestures:string[] = [
    "assets/1Pinch.png",
    "assets/1Pointing.png",
  ];

  TwoHandGestures: string[] = [
    "assets/1Open1Closed.png",
    "assets/1Open1Pointing.png",
    "assets/2Closed.png",
    "assets/2Open.png",
    "assets/2Pointing.png",
  ]

  gesturesMap: {
    [key: string]: string;
  } = {
    "assets/1Pinch.png": "Hand Pinching",
    "assets/1Pointing.png": "Hand Pointing",
    "assets/1Open1Closed.png": "Open Hand and Closed Hand",
    "assets/1Open1Pointing.png": "Open Hand and Pointing Hand",
    "assets/2Closed.png": "Two Closed Hands",
    "assets/2Open.png": "Two Open Hands",
    "assets/2Pointing.png": "Two Hands Pointing",
  };

  public getRandomImages(): void{
    // Flip a coint
    let newImage: string = this.currentImage;
    while (newImage == this.currentImage){
        let coin = this.flipCoin();

        if (coin == 0){
            newImage = this.OneHandGestures[Math.floor(Math.random() * 2)];
        }
        else{
            newImage =  this.TwoHandGestures[Math.floor(Math.random() * 5)];
        }
    }
    this.currentImage = newImage;
}

  public startGame(): void{
    this.lives = 3;
    this.correct = false;
    this.level = 0;
    this.levelProgress = 0;
    this.counter = 100;
    this.maxcounter = 100;
    this.started = true;
    this.getRandomImages();
    //this.timerId = setInterval(this.getRandomImages, this.SECOND);
    
    this.timerId = setInterval(() => {
        this.counter = this.counter - 1;
        if (this.gesture == this.gesturesMap[this.currentImage] && this.correct == false) {
          this.correct = true;
          new Audio("../../assets/correct-6033.mp3").play();
          this.levelProgress += 1;
          if (this.levelProgress == 5) {
            this.level += 1;
            this.levelProgress = 0;
            this.maxcounter = Math.floor(this.maxcounter * .8);
          }
          this.score += 1;
        }
        if(this.counter == 0) {
          if (this.correct == false) {
            this.lives -= 1;
            new Audio("../../assets/wronganswer-37702.mp3").play();
            if (this.lives == 0) {
              this.stopGame();    // End game, display stats
            }
          }
          this.counter = this.maxcounter;
          this.correct = false;
          this.getRandomImages()
        }
        // if player hands = image, then generate new image
    }, this.SECOND / 100) 
  }


  // Flip coin returns 0 or 1
  private flipCoin(): number{
    return Math.floor(Math.random() * 2);
  }


  public stopGame(): void{
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.started = false;
  }
  

  constructor() { }

  ngOnInit(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
  

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    } 
  }
}
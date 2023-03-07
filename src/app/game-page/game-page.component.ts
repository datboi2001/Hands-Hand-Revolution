import { Component, OnInit, OnDestroy } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {
  gesture: String = "";
  
  public currentImage: string = "";

  private SECOND: number = 3000;
  private timerId: ReturnType<typeof setTimeout> | null = null;

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
    this.getRandomImages();
    //this.timerId = setInterval(this.getRandomImages, this.SECOND);
    let counter = 5;
    this.timerId = setInterval(() => {
        // counter = counter - 1;
        // if(counter === 0) {
        //   counter = 5;
          this.getRandomImages()// game over
        // if player hands = image, then generate new image
    }, this.SECOND)
  }

  // Flip coin returns 0 or 1
  private flipCoin(): number{
    return Math.floor(Math.random() * 2);
  }
  
  

  constructor() { }

  ngOnInit(): void {
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
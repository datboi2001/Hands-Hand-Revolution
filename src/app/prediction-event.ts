
//TODO: If you would like to expose additional data from the handtracker component,
//extend this class with additional properties.

export class PredictionEvent {
    prediction: string = "None";

    constructor(prediction:string){
        this.prediction = prediction;
    }

    public getPrediction(){
        return this.prediction;
    }
}

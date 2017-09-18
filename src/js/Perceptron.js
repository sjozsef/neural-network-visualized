import {Layer, Network} from 'synaptic';

export class Perceptron extends Network
{
    constructor(input, hidden, output) {

        super();

        // create the layers
        this.inputLayer = new Layer(input);
        this.hiddenLayer = new Layer(hidden);
        this.outputLayer = new Layer(output);

        // connect the layers
        this.inputLayer.project(this.hiddenLayer);
        this.hiddenLayer.project(this.outputLayer);

        // set the layers
        this.set({
            input: this.inputLayer,
            hidden: [this.hiddenLayer],
            output: this.outputLayer
        });
    }

}
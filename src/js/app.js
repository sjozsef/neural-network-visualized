import { Perceptron } from './Perceptron.js';
import { VisualizableTrainer } from './VisualizableTrainer.js';
window.Vue = require( 'vue' );

window.Network = new Perceptron(2,3,1);
window.Trainer = new VisualizableTrainer( Network, 50 );

Trainer.XOR({
    error: 0.00001
});

Vue.component('visualizer', require('./components/visualizer.vue'));

const app = new Vue({
    el: '#app', 
    data: {
        snapshots: Trainer.snapshots
    }
});
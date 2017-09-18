import { Trainer } from 'synaptic';

/**
 * A trainer that creates snapshots from the network.
 */
export class VisualizableTrainer extends Trainer {

    constructor( network, snapshotEvery ) {
        super( network );
        this.snapshotEvery = snapshotEvery;
        this.epochesTrained = 0;
        this.snapshots = [];
    }

    _trainSet( trainSet, currentRate, cost ) {
        let result = super._trainSet( trainSet, currentRate, cost );
        if( 0 == ++this.epochesTrained % this.snapshotEvery ) {
            this.takeSnapshot();
        }
        return result;
    }

    takeSnapshot() {
        
        let snapshot = {
            netData: this.network.toJSON(),
            activations: []  
        };

        [
            [0,0],
            [0,1],
            [1,0],
            [1,1]
        ].forEach( (e) => {
            snapshot.activations.push({
                dataSet: e,
                result: Math.round( this.network.activate( e ) * 1000 ) / 1000, 
                expected: e[0] ^ e[1]
            });
        });

        this.snapshots.push( snapshot );
    }
}
<template>
<div class="visualizer">

    <object type="image/svg+xml" data="/images/network.svg" /><br />

    <div class="visualizer__progress">

        <div class="visualizer__slider">

            <vue-slider v-model="currentSnapshotIdx" 
                        :realTime="true"
                        :lazy="false"
                        :speed="0.01"
                        :width="300"
                        :style="vueSliderStyle"
                        :processStyle="vueSliderProcessStyle"
                        :bgStyle="vueSliderBgStyle"
                        :tooltip="false"
                        :min="0" 
                        :max="maxSnapshot" >
            </vue-slider>

        </div>

        <div class="visualizer__epoch">
            <strong>Epoch: </strong> {{ 50 * currentSnapshotIdx + 1  }}/{{ 50 * maxSnapshot + 1 }}
        </div>

    </div>

</div>
</template>

<script>
    import VueSlider from 'vue-slider-component';
    export default {
        components: {
            VueSlider
        },
        props: [ 'snapshots' ],
        data () {
            return {
                currentSnapshotIdx: 0,
                vueSliderStyle: {
                    "display": "inline-block"
                },
                vueSliderProcessStyle: {
                    "backgroundColor": "#2881F2"
                },
                vueSliderBgStyle: {
                    "backgroundColor": "#FFFFFF",
                    "cursor": "pointer"
                }
            }
        },
        computed: {
            maxSnapshot() {
                return this.snapshots.length - 1;
            },
            currentSnapshot() {
                return this.snapshots[this.currentSnapshotIdx];
            },
            currentActivations() {
                return this.currentSnapshot.activations;
            }
        },
        methods: {
            color( connectionIdx ) {
                let w = this.weight( connectionIdx );
                return w == Math.abs( w ) ? "#00ff00" : "#ff0000";
            },
            width( connectionIdx ) {
                return 0.5 + 1.5 * Math.abs( this.weight( connectionIdx ) );
            },
            weight( connectionIdx ) {
                let snapshot = this.currentSnapshot;
                let w = snapshot.netData.connections[ connectionIdx ].weight;
                return w;
            },
            roundedActivation( neuronIdx ) {
                return Math.round( this.activation( neuronIdx ) * 100 ) / 100;
            },
            activation( neuronIdx ) {
                let snapshot = this.currentSnapshot;
                return snapshot.netData.neurons[neuronIdx].activation;
            },
            roundedError( neuronIdx ) {
                return Math.round( this.error( neuronIdx ) * 100 ) / 100;
            },
            error( neuronIdx) {
                let snapshot = this.currentSnapshot;
                return snapshot.netData.neurons[neuronIdx].error;
            }
        },
        created () {
            console.log( this.snapshots );
        }
    }
</script>

<style scoped="1" >
    .visualizer {
        display: inline-block;
        text-align: center;
    }
</style>
<template>
<div class="visualizer">

    <div class="network">
        <svg viewBox="0 0 665 322" width="665" height="322" xmlns="http://www.w3.org/2000/svg">
            <g>

            <g id="neuron_i1">
            <ellipse stroke="#ffffff" ry="30" rx="30" id="n0" cy="94.51692" cx="148.49863" stroke-width="3" fill="none"/>
            </g>
            <g id="neuron_i2">
            <ellipse stroke="#ffffff" ry="30" rx="30" id="n1" cy="232.02816" cx="147.58139" stroke-width="3" fill="none"/>
            </g>
            <g id="neuron_h1">
            <ellipse stroke="#ffffff" ry="30" rx="30" id="n2" cy="38.24621" cx="332.5" stroke-width="3" fill="none"/>
            </g>
            <g id="neuron_h2">
            <ellipse stroke="#ffffff" ry="30" rx="30" id="n3" cy="161" cx="332.5" stroke-width="3" fill="none"/>
            </g>
            <g id="neuron_h3">
            <ellipse stroke="#ffffff" ry="30" rx="30" id="n4" cy="286.61484" cx="332.5" stroke-width="3" fill="none"/>
            </g>
            <g id="neuron_o1">
                <ellipse stroke="#ffffff" ry="30" rx="30" id="n5" cy="161" cx="511.5" stroke-width="3" fill="none"/>
            </g>
                <line fill="none" :stroke-width="width(0)" :stroke="color(0)" x1="173" y1="75.5" x2="302" y2="42.5" id="svg_14" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(1)" :stroke="color(1)" x1="174" y1="108.5" x2="304" y2="150.5" id="svg_6" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(2)" :stroke="color(2)" x1="166" y1="117.5" x2="308" y2="268.5" id="svg_19" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(3)" :stroke="color(3)" x1="171" y1="210.5" x2="310" y2="59.5" id="svg_20" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(4)" :stroke="color(4)" x1="176" y1="219.5" x2="304" y2="170.5" id="svg_10" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(5)" :stroke="color(5)" x1="176" y1="245.5" x2="304" y2="284.5" id="svg_15" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(6)" :stroke="color(6)" x1="361" y1="48.5" x2="490" y2="140.5" id="svg_16" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(7)" :stroke="color(7)" x1="362" y1="161.5" x2="482" y2="159.5" id="svg_17" stroke-linejoin="null" stroke-linecap="null"/>
                <line fill="none" :stroke-width="width(8)" :stroke="color(8)" x1="361" y1="278.5" x2="488" y2="180.5" id="svg_18" stroke-linejoin="null" stroke-linecap="null"/>
                <text fill="#ffffff" stroke-width="0" stroke-opacity="null" x="147.9035" y="99.01692" id="text0" font-size="13" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve" stroke="#9ae190">{{roundedActivation(0)}}</text>
                <text fill="#ffffff" stroke-width="0" stroke-opacity="null" x="147.97202" y="236.54279" id="text1" font-size="13" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve" stroke="#9ae190">{{ roundedActivation(1) }}</text>
                <text fill="#ffffff" stroke-width="0" stroke-opacity="null" x="332.89063" y="42.76084" id="text2" font-size="13" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve" stroke="#9ae190">{{ roundedActivation(2) }}</text>
                <text fill="#ffffff" stroke-width="0" stroke-opacity="null" x="332.89063" y="165.50346" id="text3" font-size="13" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve" stroke="#9ae190">{{ roundedActivation(3) }}</text>
                <text fill="#ffffff" stroke-width="0" stroke-opacity="null" x="332.89063" y="291.12703" id="text4" font-size="13" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve" stroke="#9ae190">{{ roundedActivation(4) }}</text>
                <text fill="#ffffff" stroke-width="0" stroke-opacity="null" x="511.89063" y="165.51463" id="text5" font-size="13" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve" stroke="#9ae190">{{ roundedActivation(5) }}</text>
            </g>

        </svg>
    </div>

    <div class="progress">

        <div class="progress__slider">

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

        <div class="progress__epoch">
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
                return w == Math.abs( w ) ? "#9AE190" : "#FF7272";
            },
            width( connectionIdx ) {
                return 0.5 + 0.38 * Math.abs( this.weight( connectionIdx ) );
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
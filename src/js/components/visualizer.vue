<template>
<div class="visualizer">

    <label>learning rate</label>
    <select>
        <option>0.1</option>
        <option>0.3</option>
    </select><br />
    <br />

    <svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
        <g>
            <ellipse ry="25.5" rx="25.5" id="svg_4" cy="100" cx="65" stroke-width="1.5" stroke="#000" fill="#fff" />
            <text font-size="15" x="50" y="70" >i1: {{ roundedBias(0) }}</text>
            <ellipse ry="25.5" rx="25.5" id="svg_2" cy="290.57833" cx="65" stroke-width="1.5" stroke="#000" fill="#fff"/>
            <text font-size="15" x="50" y="260" >i2: {{ roundedBias(1) }}</text>
            <ellipse ry="25.5" rx="25.5" id="svg_6" cy="62.32462" cx="291.544" stroke-width="1.5" stroke="#000" fill="#fff"/>
            <text font-size="15" x="280" y="35" >h1: {{ roundedBias(2) }}</text>
            <ellipse ry="25.5" rx="25.5" id="svg_5" cy="188.57833" cx="290" stroke-width="1.5" stroke="#000" fill="#fff"/>
            <text font-size="15" x="280" y="160" >h2: {{ roundedBias(3) }}</text>
            <ellipse ry="25.5" rx="25.5" id="svg_7" cy="317.64033" cx="294" stroke-width="1.5" stroke="#000" fill="#fff"/>
            <text font-size="15" x="280" y="290" >h3: {{ roundedBias(4) }}</text>
            <ellipse ry="25.5" rx="25.5" id="svg_8" cy="192.33918" cx="501.05542" stroke-width="1.5" stroke="#000" fill="#fff"/>
            <text font-size="15" x="490" y="165" >o1: {{ roundedBias(4) }}</text>

            <line stroke-linecap="null" stroke-linejoin="null" id="svg_10" y2="60" x2="260.5" y1="94" x1="101.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(0)" :stroke="color(0)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_11" y2="176" x2="255.5" y1="107" x1="99.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(1)" :stroke="color(1)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_12" y2="306" x2="264.5" y1="123" x1="94.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(2)" :stroke="color(2)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_13" y2="84" x2="256.5" y1="260" x1="85.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(3)" :stroke="color(3)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_14" y2="202" x2="251.5" y1="274" x1="95.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(4)" :stroke="color(4)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_15" y2="312" x2="260.5" y1="290" x1="99.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(5)" :stroke="color(5)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_22" y2="170" x2="472.5" y1="64" x1="324.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(6)" :stroke="color(6)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_23" y2="194" x2="464.5" y1="190" x1="330.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(7)" :stroke="color(7)"/>
            <line stroke-linecap="null" stroke-linejoin="null" id="svg_24" y2="209" x2="464.5" y1="312" x1="329.5" fill-opacity="null" stroke-opacity="1" :stroke-width="width(8)" :stroke="color(8)"/>
        </g>
    </svg>

    <p>
        <strong>Nr. of iteratins: </strong> {{ maxSnapshot +1  }}<br />
    </p>
    
    <table>
        <thead>
            <th>input</th>
            <th>expected</th>
            <th>given</th>
        </thead>
        <tbody>
            <tr v-for="activation in currentActivations">
                <td>{{activation.dataSet[0]}}, {{activation.dataSet[1]}}</td>
                <td>{{activation.expected}}</td>
                <td>{{activation.result}}</td>
            </tr>
        </tbody>
    </table>
    
    {{ currentSnapshotIdx }} <input v-model="currentSnapshotIdx" type="range" min="0" :max="maxSnapshot" step="1" style="width:300px; display: inline-block"/>
</div>
</template>

<script>
    export default {
        props: [ 'snapshots' ],
        data () {
            return {
                currentSnapshotIdx: 0
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
            roundedBias( neuronIdx ) {
                return Math.round( this.bias( neuronIdx ) * 100 ) / 100;
            },
            bias( neuronIdx ) {
                let snapshot = this.currentSnapshot;
                return snapshot.netData.neurons[ neuronIdx ].bias;
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
    select {
        display: inline-block;
    }
</style>
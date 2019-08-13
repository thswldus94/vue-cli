<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="오늘의 뉴스 건수"
                                type="gradient-red"
                                v-bind:sub-title="statSummary.newsCount + '건'"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i v-bind:class="'fa fa-arrow-' + statSummary.newsArrow"></i> {{ statSummary.newsPer }}%</span>
                            <span class="text-nowrap">Since last night</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="CPU Usage"
                                type="gradient-orange"
                                v-bind:sub-title="statSummary.cpu + '%'"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i v-bind:class="'fa fa-arrow-' + statSummary.cpuArrow"></i> {{ statSummary.cpuPer }}%</span>
                            <span class="text-nowrap">Since last 1 minute</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Memory Usage"
                                type="gradient-green"
                                v-bind:sub-title="statSummary.mem + '%'"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i v-bind:class="'fa fa-arrow-' + statSummary.memArrow"></i> {{ statSummary.memPer }}%</span>
                            <span class="text-nowrap">Since last 1 minute</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Disk Usage (/home)"
                                type="gradient-info"
                                v-bind:sub-title="statSummary.disk + '%'"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i v-bind:class="'fa fa-arrow-' + statSummary.diskArrow"></i> {{ statSummary.diskPer }}%</span>
                            <span class="text-nowrap">Since last 1 minute</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <!-- <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Sales value</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
											href="#"
											:class="{active: bigLineChart.activeIndex === 0}"
											@click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">Month</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
											href="#"
											:class="{active: bigLineChart.activeIndex === 1}"
											@click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">Week</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card> -->
                    <highcharts :options="chartOptions" :highcharts="hcInstance"></highcharts>
                </div>

                <!-- <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </div>
                        </div>

                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div> -->
            </div>
            <!-- End charts-->

            <!--Tables-->
            <!-- <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
            </div> -->
            <!--End tables-->
        </div>

    </div>
</template>
<script>
//import axios from 'axios'

// Highcharts
import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue, {
	highcharts: Highcharts
});


export default {
    data() {
		return {
			statSummary: {
				newsCount: '0',
				cpu: '0.0',
				mem: '0.0',
				disk: '0.0',
				newsPer: '0.00',
				cpuPer: '0.00',
				memPer: '0.00',
				diskPer: '0.00',
				newsArrow: '',
				cpuArrow: '',
				memArrow: '',
				diskArrow: ''
            },
            hcInstance: Highcharts,
            chartOptions: []
		};
    },
    // created() {
    //     this.getMemoryData();
    // },
	methods: {
		getSummary() {
			var vm = this;
			this.$http.get('/get/stat').then(function(result) {
				vm.statSummary.newsCount = result.data.newsCount.toString();
				vm.statSummary.newsPer = result.data.newsPer;
				vm.statSummary.newsArrow = result.data.newsArrow;

				vm.statSummary.cpu = result.data.cpu.toString();
				vm.statSummary.cpuPer = result.data.cpuPer;
				vm.statSummary.cpuArrow = result.data.cpuArrow;

				vm.statSummary.mem = result.data.mem.toString();
				vm.statSummary.memPer = result.data.memPer;
				vm.statSummary.memArrow = result.data.memArrow;

				vm.statSummary.disk = result.data.disk.toString();
				vm.statSummary.diskPer = result.data.diskPer;
				vm.statSummary.diskArrow = result.data.diskArrow;
			});
        },
        getMemoryData() {
            return this.$http.get('/get/stat/system');
        },
        getIntervalData() {
            // var vm = this;
            // //var chart = new Highcharts.Chart(this.chartOptions);
            // console.log(this.chartOptions);
            
            // setInterval(async function () {
            //     var newData = await vm.getMemoryData();
            //     //console.log(newData.data[newData.length - 1]);
            //     var last = newData.data.pop();
            //     console.log(last);

            //     vm.chartOptions.series.addPoint([last.x, last.y], true, true);
            //     //vm.chartOptions.series[0].data = [last.x, last.y];
            // }, 1000);        
        }
	},
	async mounted() {
        // 상단 요약
        this.getSummary();

        // 차트 데이터
        var memoryData = await this.getMemoryData();
        
        this.chartOptions = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                // events: {
                //     load: function () {
                //         setInterval( function () {
                //             var series = this.series[0];
                //             var newData =  vm.getMemoryData();
                //             //console.log(newData.data[newData.length - 1]);
                //             var last = newData.data.pop();
                //             console.log(last);

                //             series.addPoint([last.x, last.y], true, true);
                //         }, 1000);
                //     }
                // }
            },
            time: {
                useUTC: false
            },
            title: {
                text: 'Memory 변화 추이'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: memoryData.data
            }]
        };

        this.getIntervalData();
    }
};
</script>
<style></style>

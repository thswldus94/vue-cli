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
                            <!-- <span class="text-success mr-2"><i v-bind:class="'fa fa-arrow-' + statSummary.diskArrow"></i> {{ statSummary.diskPer }}%</span> -->
                            <span class="text-nowrap">Since last 1 minute</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-md-6 col-sm-12 mb-5 mb-xl-0">
                    <card header-classes="bg-transparent">
                        <highcharts :options="memChartOptions" :highcharts="memInstance" v-bind:style="chartClass"></highcharts>
                    </card>
                </div>

                <div class="col-md-6 col-sm-12 mb-5 mb-xl-0">
                    <card header-classes="bg-transparent">
                        <highcharts :options="cpuChartOptions" :highcharts="cpuInstance" v-bind:style="chartClass"></highcharts>
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-5 mb-xl-0">
                    <div class="row mt-3">
                        <div class="col-sm-12 mb-5">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <base-alert type="warning">
                                        <span class="alert-inner--icon"><i class="ni ni-notification-70 mr-2"></i> </span>
                                        <span class="alert-inner--text">매일 오후 2시의 HOT 뉴스 (Feat. 다음 뉴스 - 중앙일보)</span>
                                    </base-alert>

                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h3 class="mb-0"></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-1">
                                    <div class="col-sm-12 mb-5">
                                        <div class="table-responsive">
                                            <base-table class="table align-items-center table-flush"
                                                :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                                                tbody-classes="list"
                                                v-bind:data="tableData">
                                                <template slot="columns">
                                                    <th>ID</th>
                                                    <th>기사 제목</th>
                                                </template>

                                                <template slot-scope="{row}">
                                                    <td class="budget">
                                                        {{row.id}}
                                                    </td>
                                                    <td class="budget">
                                                        {{row.title}}
                                                    </td>
                                                </template>
                                            </base-table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
		return {
            // 차트 인스턴스
            memInstance: Highcharts,
            cpuInstance: Highcharts,
            memChartOptions: {},
            cpuChartOptions: {},
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
            chartClass: {
                height: '200px'
            },
            tableData: [],
            offset: 0,
            limit: 5
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
				//vm.statSummary.diskArrow = result.data.diskArrow;
			});
        },
        getSystemData() {
            return this.$http.get('/get/stat/system');
        },
        getIntervalData() {
            var vm = this;
            setInterval(async function() {
                var newData = await vm.getSystemData();

                var memLast = newData.data.mem.pop();
                var cpuLast = newData.data.cpu.pop();

                vm.memInstance.charts[0].series[0].addPoint([memLast.x, memLast.y], true, true);
                vm.cpuInstance.charts[1].series[0].addPoint([cpuLast.x, cpuLast.y], true, true);

            }, 1000 * 10);
        },
        getNewsData() {
            var vm = this;
            var url = '/get/news?offset=' + this.offset + '&limit=' + this.limit;
            this.$http.get(url).then(function(result) {
                // 페이지 카운트 
                vm.pageBlockCount = Math.ceil(result.data.count / vm.limit);
                // 데이터
                vm.tableData = result.data.data;
            });
        }
	},
	async mounted() {
        // 상단 요약
        this.getSummary();

        // 시스템 데이터
        var systemData = await this.getSystemData();
        
        this.memChartOptions = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
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
                name: 'Memory Data',
                data: systemData.data.mem
            }]
        };

        this.cpuChartOptions = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
            },
            time: {
                useUTC: false
            },
            title: {
                text: 'CPU 변화 추이'
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
                name: 'CPU Data',
                data: systemData.data.cpu
            }]
        };


        this.type == 'dark';
        this.getNewsData();


        this.getIntervalData();
    }
};
</script>
<style></style>

<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>
        <!-- Card stats -->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header border-0">
                            <base-alert type="warning">
                                <span class="alert-inner--icon"><i class="ni ni-notification-70 mr-2"></i> </span>
                                <span class="alert-inner--text"><strong>Notice!</strong> Python3 를 이용하여 다음뉴스(중앙일보 섹션)을 크롤링하여 가져오고 있습니다!</span>
                            </base-alert>

                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="mb-0">매일 오후 2시의 HOT 뉴스 (Feat. 다음 뉴스 - 중앙일보)</h3>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <base-table class="table align-items-center table-flush"
                                :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                                tbody-classes="list"
                                v-bind:data="tableData">
                                <template slot="columns">
                                    <th>ID</th>
                                    <th>기사 제목</th>
                                    <th>수집일</th>
                                    <th>뉴스 보기</th>
                                    <th>뉴스 바로가기</th>
                                </template>

                                <template slot-scope="{row}">
                                    <td class="budget">
                                        {{row.id}}
                                    </td>
                                    <td class="budget">
                                        {{row.title}}
                                    </td>
                                    <td class="budget">
                                        {{row.date.substring(0, 10)}}
                                    </td>
                                    <td class="budget">
                                        <base-button outline type="success" size="sm" v-on:click="viewNews(row)">
                                            <i class="ni ni-zoom-split-in"></i> 
                                            뉴스 보기
                                        </base-button>
                                    </td>
                                    <td class="budget">
                                        <base-button outline type="info" size="sm" v-on:click="gotoLink(row.link)">
                                            <i class="ni ni-active-40"></i> 
                                            뉴스 바로가기
                                        </base-button>
                                        <div id="aaa"></div>
                                    </td>
                                </template>
                            </base-table>
                        </div>

                        <div class="mt-3 mb-3 text-right">
                            <base-pagination v-bind:page-count="pageBlockCount" v-model="pagination.default" align="center"></base-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

		<modal :show.sync="modalCard">
			<h3>{{ newsTitle }}</h3>
			<h6>게시일: {{ newsDate }}</h6>
            <p class="mt-3 pt-3" style="border-top: 1px solid #e0e0e0;">{{ newsContent }}</p>

            <template slot="footer">
                <base-button type="link" class="ml-auto" @click="modalCard = false">Close
                </base-button>
            </template>
        </modal>
    </div>
</template>
<script>

export default {
    name: 'news',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
        return {
            tableData: [],
			modalCard: false,
			newsTitle: '',
			newsContent: '',
            newsDate: '',
            pagination: {
                default: 1
            },
            pageBlockCount: 1,
            offset: 0,
            limit: 10
        }
    },
    methods: {
        getNewsData() {
            var vm = this;
            var url = '/get/news?offset=' + this.offset + '&limit=' + this.limit;
            this.$http.get(url).then(function(result) {
                // 페이지 카운트 
                vm.pageBlockCount = Math.ceil(result.data.count / vm.limit);
                // 데이터
                vm.tableData = result.data.data;
            });
        },
        gotoLink(link) {
            window.open(link, '_blank');
        },
        viewNews(news) {
			this.newsTitle = news.title;
			this.newsContent = news.content;
			this.newsDate = news.date.substring(0, 10);
			
			this.modalCard = true;
        }
    },
    mounted() {
        this.type == 'dark';
        this.getNewsData();
    },
    watch: {
        pagination: {
            deep: true,
            handler(pgn) {
                var vm = this;
                vm.offset = String((pgn.default - 1) * vm.limit);
                var url = '/get/news?offset=' + vm.offset + '&limit=' + vm.limit;
                this.$http.get(url).then(function(result) {
                    vm.tableData = result.data.data;
                });
            }
        }
    }
};
</script>
<style></style>

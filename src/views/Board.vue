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
                                <span class="alert-inner--text"><strong>Notice!</strong> 자유 게시판</span>
                            </base-alert>

                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="mb-0">자유롭게 글을 써주세요~</h3>
                                </div>

                                <div class="col text-right">
                                    <base-button type="primary" size="sm" v-on:click="addBoard()"><i class="fa fa-plus"></i> 등록</base-button>
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
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>조회수</th>
                                    <th>수정일</th>
                                    <!-- <th>관리</th> -->
                                </template>

                                <template slot-scope="{row}">
                                    <td class="budget">
                                        {{row.id}}
                                    </td>
                                    <td class="budget">
                                        <!-- <a v-bind:href="`/board/detail/${row.id}`" target="_blank">{{row.title}}</a> -->
                                        <router-link v-bind:to="{ path : `/board/view/${row.id}` }">{{row.title}}</router-link>
                                    </td>
                                    <td class="budget">
                                        {{row.user}}
                                    </td>
                                    <td class="budget">
                                        {{row.hit}}
                                    </td>
                                    <td class="budget">
                                        {{row.udate}}
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
    </div>
</template>
<script>

export default {
    name: 'board',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
        return {
            files: [],
            tableData: [],
			modals: {
                add: false,
                view: false
            },
            form: {
                title: '',
                content: '',
                file_upload: ''
            },
            pagination: {
                default: 1
            },
            board: {
                title: '',
                user: '',
                rdate: '',
                udate: '',
                content: ''
            },
            pageBlockCount: 1,
            offset: 0,
            limit: 10
        }
    },
    methods: {
        getBoardData() {
            var vm = this;
            var url = `/get/board?offset=${this.offset}&limit=${this.limit}`;
            this.$http.get(url).then(function(result) {
                // 페이지 카운트 
                vm.pageBlockCount = Math.ceil(result.data.count / vm.limit);
                // 데이터
                vm.tableData = result.data.data;
            });
        },
        addBoard() {
            this.$router.push("/board/post");
        }
    },
    mounted() {
        this.type == 'dark';
        this.getBoardData();
    },
    watch: {
        pagination: {
            deep: true,
            handler(pgn) {
                var vm = this;
                vm.offset = String((pgn.default - 1) * vm.limit);
                var url = `/get/board?offset=${vm.offset}&limit=${vm.limit}`;
                this.$http.get(url).then(function(result) {
                    vm.tableData = result.data.data;
                });
            }
        }
    }
};
</script>

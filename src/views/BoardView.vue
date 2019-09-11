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
                            <div class="row align-items-center pb-3" style="border-bottom: 1px dashed #e0e0e0;">
                                <div class="col">
                                    <h3 class="mb-0">{{ boardData.title }}</h3>
                                </div>
                            </div>

                            <div class="row align-items-center mt-3">
                                <div class="col-sm-7 align-items-left">
                                    <h5 class="mb-0">작성자: {{ boardData.uname }}</h5>
                                </div>
                                <div class="col-sm-2 align-items-right">
                                    <span class="mb-0 span-info">조회수: {{ boardData.hit }}</span>
                                </div>
                                <div class="col-sm-3 align-items-right">
                                    <span class="mb-0 span-info">수정일시: {{ boardData.udate }}</span>
                                </div>
                            </div>

                            <div class="row align-items-center mt-4">
                                <div class="col-lg-12 align-items-left">
                                    <p class="board-content">{{ boardData.content }}</p>
                                </div>
                            </div>

                            <div v-show="showControlPanel" class="row align-items-center mt-4">
                                <div class="col-lg-12" style="text-align: right;">
                                    <base-button outline type="success" size="sm" v-on:click="editBoard(param.id)">
                                        <i class="ni ni-zoom-split-in"></i> 
                                        수정
                                    </base-button>
                                    <base-button outline type="danger" size="sm" v-on:click="removeBoard(param.id)">
                                        <i class="ni ni-zoom-split-in"></i> 
                                        삭제
                                    </base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'boardview',
    data() {
        return {
            boardData: {},
            showControlPanel: false
        }
    },
    methods: {
        getBoardViewData() {
            var vm = this;
            var url = '/get/board/view/' + this.param.id;
            this.$http.get(url).then(function(result) {
                vm.boardData = result.data;
                vm.checkControlPanel(result.data.uid);
            });
        },
        editBoard(id) {
            location.href = "/board/post/" + id;
        },
        removeBoard(id) {
            if (id > 0 && id !== undefined) {
                if (confirm("게시글을 삭제하시겠습니까?")) {
                    var url = "/delete/board/" + id;
                    this.$http.get(url).then(function(result) {
                        if (result.status === 200) {
                            location.href = "/board";
                        } else {
                            alert('실패');
                        }
                    });
                }
            } else {
                alert('유효하지 않은 게시글입니다.');
            }
        },
        checkControlPanel(uid) {
            // 로그인 하지 않고 글쓰는 사람 위해서 테스트로 모두 열어두기로 함
            this.showControlPanel = true;

            // var vm = this;
            // this.$http.get('/api/session').then(function(result) {
            //     if (Object.keys(result.data).length !== 0) {
            //         if (result.data.id.length > 0 && result.data.email.length > 0) { 
            //             if (uid === result.data.uid) {
            //                 vm.showControlPanel = true;
            //             }
            //         }
            //     }
            // });    
        }
    },
    computed: {
        param: function () {
            return this.$route.params;
        }
    },
    mounted() {
        this.type == 'dark';
        this.getBoardViewData();
    }
};
</script>
<style>
.board-content {
    min-height: 300px;
}

.span-info {
    font-size: 70%;
    color: #32325d;
}
</style>

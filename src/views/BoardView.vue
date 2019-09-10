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
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="mb-0">{{ boardData.title }}</h3>
                                </div>
                            </div>

                            <div class="row align-items-center mt-2">
                                <div class="col-lg-8 align-items-left">
                                    <h5 class="mb-0">작성자: {{ boardData.uname }}</h5>
                                </div>
                                <div class="col-lg-1 align-items-right">
                                    <h5 class="mb-0">조회수: {{ boardData.hit }}</h5>
                                </div>
                                <div class="col-lg-3 align-items-right">
                                    <h5 class="mb-0">수정일시: {{ boardData.udate }}</h5>
                                </div>
                            </div>

                            <div class="row align-items-center mt-4">
                                <div class="col-lg-8 align-items-left">
                                    <p class="board-content">{{ boardData.content }}</p>
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
            boardData: {}
        }
    },
    methods: {
        getBoardViewData() {
            var vm = this;
            var url = '/get/board/view/' + this.param.id;
            this.$http.get(url).then(function(result) {
                vm.boardData = result.data;
            });
            
            
        },
        viewBoard(id) {
            var vm = this;
            var getUrl = '/get/board/view/' + id;
            vm.$http.get(getUrl).then(function(result) {
                var board = result.data;
                vm.board.title = board.title;
                vm.board.user = board.uname;
                vm.board.rdate = board.rdate;
                vm.board.udate = board.udate;
                vm.board.content = board.content;
            });
            
            this.modals.view = true;
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
    min-height: 500px;
}
</style>

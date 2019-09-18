<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>
        <!-- Card stats -->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <form role="form" v-on:submit.prevent="doAction()">
                            <div class="card-header border-0">
                                <div class="row align-items-center pb-1" style="border-bottom: 1px dashed #e0e0e0;">
                                    <div class="col-sm-3">
                                        <h4 class="text-uppercase text-muted">제목</h4>
                                    </div>
                                    <div class="col-sm-9">
                                        <base-input class="mb-3" placeholder="제목" required v-model="form.title" name="title"></base-input>
                                    </div>
                                </div>

                                <div class="row align-items-center mt-4">
                                    <div class="col-lg-12 align-items-left">
                                        <h4 class="text-uppercase text-muted">내용</h4>
                                        <textarea class="form-control mb-3" id="exampleFormControlTextarea1" rows="3" placeholder="본문" name="content" v-model="form.content"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 구글시트 get url
//https://docs.google.com/spreadsheets/d/171YM7dOCrwA0CMcswHs8idvTlgMLkHOmTKeWfiHXjVc/gviz/tq?

// 구글시트 insert url
//https://script.google.com/macros/s/AKfycbwwheX3KnqtQ1AnlMbu4J16bCCIcPpVZP2ZA3Yj5kPzjDk_r3zL/exec

export default {
    name: 'sheet',
    data() {
        return {
            files: [],
            form: {
                title: '',
                content: '',
                file_upload: ''
            },
            boardData: {},
            showAddButton: false,
            showEditButton: false
        }
    },
    methods: {

    },
    computed: {

    },
    mounted() {
        var url = "https://script.google.com/macros/s/AKfycbwwheX3KnqtQ1AnlMbu4J16bCCIcPpVZP2ZA3Yj5kPzjDk_r3zL/exec";
        this.$http.get(url, {
            params: {
                '음식' : 'aaa',
                '수량' : 3,
                '다먹은사람' : '12345',
                '못먹은사람' : 'ㅠㅠㅠ'
            }
        }).then(function(result) {
            console.log(result);
            
        });
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

.filebox input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
}
.filebox .btn-upload {
    display: inline-block; 
    padding: .5em .75em; 
    color: #999; 
    font-size: inherit; 
    line-height: normal; 
    vertical-align: middle; 
    background-color: #fdfdfd; 
    cursor: pointer; 
    border: 1px solid #ebebeb; 
    border-bottom-color: #e2e2e2; 
    border-radius: .25em; 
} 

.filebox .upload-name {
    display: inline-block; 
    padding: .5em .75em; 
    
    font-size: inherit; 
    font-family: inherit; 
    line-height: normal; 
    vertical-align: middle; 
    background-color: #fff; 
    border: 1px solid #ebebeb; 
    border-bottom-color: #e2e2e2; 
    border-radius: .25em; 
    -webkit-appearance: none; 
    
    -moz-appearance: none; 
    appearance: none;
}
</style>

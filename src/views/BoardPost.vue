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
                                    <div class="col">
                                        <base-input class="mb-3" placeholder="제목" required v-model="form.title" name="title"></base-input>
                                    </div>
                                </div>

                                <div class="row align-items-center mt-4">
                                    <div class="col-lg-12 align-items-left">
                                        <textarea class="form-control mb-3" id="exampleFormControlTextarea1" rows="3" placeholder="본문" name="content" v-model="form.content"></textarea>
                                    </div>
                                </div>

                                <div class="row align-items-center mt-4">
                                    <div class="col-lg-12 align-items-left">
                                        <!-- 기본 file input name은 "file" -->
                                        <file-upload
                                            ref="upload"
                                            v-model="files"
                                            post-action="/upload/board"
                                            @input-file="inputFile"
                                            @input-filter="inputFilter"
                                            class="btn btn-info btn-sm"
                                        >
                                            <i class="ni ni-fat-add mr-2"></i> 파일 선택
                                        </file-upload>

                                        <base-button 
                                            type="primary"
                                            class="mb-0 btn-upload"
                                            size="sm"
                                            v-show="!$refs.upload || !$refs.upload.active"
                                            @click.prevent="$refs.upload.active = true"
                                        >
                                            <i class="ni ni-cloud-upload-96 mr-2"></i> 업로드 시작
                                        </base-button>
                                        
                                        <base-button
                                            type="warning"
                                            class="mb-0 btn-upload"
                                            size="sm"
                                            v-show="$refs.upload && $refs.upload.active"
                                            @click.prevent="$refs.upload.active = false"
                                        >
                                            <i class="ni ni-fat-remove mr-2"></i> 업로드 중지
                                        </base-button>
                                    </div>
                                </div>

                                <div class="row align-items-center mt-4">
                                    <div class="col-lg-12 align-items-left">
                                        <div v-for="file in files" :key="file.id">
                                            <template>
                                                <small>{{file.name}}</small> -
                                                <small>({{file.size}} Bytes)</small>
                                                <small v-if="file.error" class="text-red"> - {{file.error}}</small>
                                                <small v-else-if="file.success" class="text-green"> - success</small>
                                                <small v-else-if="file.active" class="text-yellow"> - uploading...</small>
                                                <small v-else></small>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="text-center">
                                    <base-button type="primary" class="my-4 mb-2" nativeType="submit">등록</base-button>
                                </div> -->

                                <div class="row align-items-center mt-4">
                                    <div class="col-lg-12" style="text-align: right;">
                                        <base-button outline type="primary" size="sm" v-on:click="addBoard()" v-show="showAddButton">
                                            <i class="ni ni-zoom-split-in"></i> 
                                            등록
                                        </base-button>
                                        <base-button outline type="success" size="sm" v-on:click="editBoard()" v-show="showEditButton">
                                            <i class="ni ni-zoom-split-in"></i> 
                                            수정
                                        </base-button>
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
const VueUploadComponent = require('vue-upload-component');

export default {
    name: 'boardpost',
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
    components: {
        FileUpload: VueUploadComponent
    },
    methods: {
        getBoardViewData() {
            if (this.param.id !== undefined && this.param.id > 0) {
                var url = '/get/board/view/' + this.param.id;
                var vm = this;
                this.$http.get(url).then(function(result) {
                    vm.form.title = result.data.title;
                    vm.form.content = result.data.content;
                });
            }
        },
        doAction() {
            if (this.showAddButton === true && this.showEditButton === false) {
                this.addBoard();
            } else {
                this.editBoard();
            }
        },
        addBoard() {
            var url = '/add/board';
            if (this.form.title != '') {
                this.$http.post(url, {
                    title: this.form.title,
                    content: this.form.content,
                    //uid: 1,
                    file_upload: this.form.file_upload
                }).then(function(result) {
                    if (result.status == 200) {
                        location.href = "/board";
                    }
                });
            } else {
                alert('제목을 입력 해 주세요.');
            }
        },
        editBoard() {
            var url = '/update/board/' + this.param.id;
            if (this.form.title != '') {
                this.$http.post(url, {
                    title: this.form.title,
                    content: this.form.content
                }).then(function(result) {
                    if (result.status == 200) {
                        location.href = "/board";
                    }
                });
            } else {
                alert('제목을 입력 해 주세요.');
            }
        },
        checkControlPanel() {
            if (this.param.id === undefined) {
                this.showAddButton = true;
                this.showEditButton = false;
            } else {
                this.showEditButton = true;
                this.showAddButton = false;
            }  
        },
        // file upload methods
        inputFile(newFile, oldFile) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
                // get response data
                if (newFile.xhr) {
                    // get the response status code
                    this.form.file_upload = newFile.response.filename;
                }
            }
        },
        inputFilter(newFile) {
            newFile.blob = ''
            // var URL = window.URL || window.webkitURL;
            // if (URL && URL.createObjectURL) {
            //     newFile.blob = URL.createObjectURL(newFile.file);
            // }
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

        this.checkControlPanel();
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

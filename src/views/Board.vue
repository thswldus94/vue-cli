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
                                    <base-button type="primary" size="sm" @click="modals.add = true"><i class="ni ni-fat-add"></i> 등록</base-button>
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
                                </template>

                                <template slot-scope="{row}">
                                    <td class="budget">
                                        {{row.id}}
                                    </td>
                                    <td class="budget">
                                        <a v-on:click="viewBoard(row.id)">{{row.title}}</a>
                                    </td>
                                    <td class="budget">
                                        {{row.uid}}
                                    </td>
                                    <td class="budget">
                                        {{row.hit}}
                                    </td>
                                    <td class="budget">
                                        {{row.udate.substring(0, 10)}}
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

		<modal :show.sync="modals.add"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted mb-3">
                        <h4>게시글 등록</h4>
                    </div>
                </template>
                <template>
                    <form role="form" v-on:submit.prevent="addBoard()">
                        <base-input class="mb-3" placeholder="제목" required
                                v-model="form.title" name="title"></base-input>
                        <textarea class="form-control mb-3" id="exampleFormControlTextarea1"
                                rows="3" placeholder="본문"
                                name="content" v-model="form.content"></textarea>

                        <div>
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

                        <div class="text-center">
                            <base-button type="primary" class="my-4 mb-2" nativeType="submit">등록</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
    </div>
</template>
<script>
const VueUploadComponent = require('vue-upload-component');
//Vue.component('file-upload', VueUploadComponent);

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
                add: false
            },
            form: {
                title: '',
                content: '',
                file_upload: ''
            },
            pagination: {
                default: 1
            },
            pageBlockCount: 1,
            offset: 0,
            limit: 10
        }
    },
    components: {
        FileUpload: VueUploadComponent
    },
    methods: {
        getNewsData() {
            var vm = this;
            var url = '/get/board?offset=' + this.offset + '&limit=' + this.limit;
            this.$http.get(url).then(function(result) {
                // 페이지 카운트 
                vm.pageBlockCount = Math.ceil(result.data.count / vm.limit);
                // 데이터
                vm.tableData = result.data.data;
            });
        },
        addBoard() {
            var vm = this;
            var url = '/add/board';
                if (this.form.title != '') {
                    this.$http.post(url, {
                    title: this.form.title,
                    content: this.form.content,
                    uid: 1,
                    file_upload: this.form.file_upload
                }).then(function(result) {
                    if (result.status == 200) {
                        // 모달 닫기
                        vm.modals.add = false;
                    }
                });
            } else {
                alert('제목을 입력 해 주세요.');
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
                var url = '/get/board?offset=' + vm.offset + '&limit=' + vm.limit;
                this.$http.get(url).then(function(result) {
                    vm.tableData = result.data.data;
                });
            }
        }
    }
};
</script>
<style>
/* .filebox input[type="file"] {
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
} */
</style>

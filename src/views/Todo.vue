<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-12 col-lg-6">
                    <h2>Todo</h2>
                    <div class="input-group" style="margin-bottom: 10px;">
                        <input type="text" class="form-control" v-model="title" v-on:keyup.enter="addTodo(title)" placeholder="할일을 입력하슈~" />
                        <span class="input-group-btn">
                            <button class="btn btn-primary" type="button" v-on:click="addTodo(title)">추가</button>
                        </span>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(todo, idx) in todos" v-bind:key="todo.id">
                            <div class="row">
                                <div class="col-lg-10">
                                    <del v-bind:style="{ display: todo.is_done === 1 ? 'block' : 'none' }">{{todo.title}}</del>
                                    <span v-bind:style="{ display: (todo !== editTodo && todo.is_done === 0) ? 'block' : 'none' }">{{todo.title}}</span>
                                    <base-input size="sm" v-bind:style="{ display: todo === editTodo ? 'block' : 'none' }" v-model="todo.title" v-on:keyup.enter="updateTodo(todo, idx)"></base-input>
                                </div>
                                <div class="col-lg-2">
                                    <base-dropdown>
                                        <base-button outline size="sm" slot="title" type="primary" class="dropdown-toggle">
                                            +더보기
                                        </base-button>
                                        <a class="dropdown-item" href="#" v-bind:style="{ display: todo.is_done == 0 ? 'block' : 'none' }" v-on:click="completeTodo(todo)">완료</a>
                                        <a class="dropdown-item" href="#" v-bind:style="{ display: todo.is_done == 1 ? 'block' : 'none' }" v-on:click="cancleCompleteTodo(todo)">완료 취소</a>
                                        <a class="dropdown-item" href="#" v-on:click="showUpdate(todo)">수정</a>
                                        <a class="dropdown-item" href="#" v-on:click="deleteTodo(todo.id, idx)">삭제</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">
                                            <small class="text-muted">ID : {{ todo.id }}</small><br />
                                            <small class="text-muted">IP : {{ todo.ip }}</small><br />
                                            <small class="text-muted">등록시간 : {{ todo.rdate.substring(0,16) }}</small>
                                        </a>
                                    </base-dropdown>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </base-header>
    </div>
</template>

<script>
export default {
    name: 'Todo',
    data() {
        return {
            todos: [],
            title: null, // 꼭 초기화 해주기 (input 의 값) 안그러면 지금 선언안했는데 뭐하시는거예욧! 하고 에러뜸 ㅜㅜ
            editing: false,
            editTodo: null,
            completed: null
        }
    },
    methods: {
        deleteTodo(id, idx) {
            if (id !== null) {
                var vm = this; // 밑에 post의 function 안으로 들어가면 this가 함수내의 것? 이 되어버리므로 미리 저장하는거예용

                this.$http.post('/delete', {
                    deleteType : 'todo',
                    id : id
                }).then(function() {
                    vm.todos.splice(idx, 1);
                });
                this.title = null; // input 값 초기화
            } else {
                alert('Invalid ID');
            }
        },
        updateTodo(todo, idx) {
            if (todo.id !== null) {
                var vm = this;
                this.$http.post('/update', {
                    updateType: 'todo',
                    title: todo.title,
                    id: todo.id
                }).then(function() {
                    vm.todos[idx].title = todo.title;
                    vm.editTodo = null;
                });
            }
        },
        showUpdate(todo) {
            this.editTodo = todo;
        },
        addTodo(title) {
            if (title !== null) {
                var vm = this; // 밑에 post의 function 안으로 들어가면 this가 함수내의 것? 이 되어버리므로 미리 저장하는거예용

                this.$http.post('/add', {
                    addType : 'todo',
                    title: title
                });

                this.$http.get('/get?type=todo').then(function(result) {
                    vm.todos = result.data;
                });
                this.title = null; // input 값 초기화
            } else {
                alert('할 일을 입력 해 주세요.');
            }
        },
        getTodos() {
            var vm = this; // 밑에 get의 function 안으로 들어가면 this가 함수내의 것? 이 되어버리므로 미리 저장하는거예용
            this.$http.get('/get/todo').then(function(result) {
                vm.todos = result.data;
            });
        },
        completeTodo(todo) {
            this.$http.post('/update/todo/done', {
                is_done: 1,
                id: todo.id
            });
        },
        cancleCompleteTodo(todo) {
            this.$http.post('/update/todo/done', {
                is_done: 0,
                id: todo.id
            });
        }
    },
    mounted() {
        //console.log('컴포넌트 마운트 완료!');
        this.getTodos();
    }
}
</script>

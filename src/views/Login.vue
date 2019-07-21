<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>외부연동 로그인</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>일반 로그인</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="ID"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.id">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>

                            <div v-if="errors.length" class="pt-4">
                                <base-alert class="pb-2 pt-2" type="danger" v-for="error in errors" v-bind:key="error.id">
                                    <i class="ni ni-fat-remove"></i> {{ error }}
                                </base-alert>
                            </div>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" v-on:click="checkForm()">로그인</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            model: {
                email: '',
                password: ''
            },
            errors: []
        }
    },
    methods: {
        checkForm: function() {
            var vm = this;
            this.errors = [];
            if (!this.model.id) this.errors.push("ID를 입력 해 주세요.");
            if (!this.model.password) this.errors.push("비밀번호를 입력 해 주세요.");

            if (!this.errors.length) {
                this.$http.post('/api/login', {
                    id: this.model.id,
                    password: this.model.password
                }).then(function(result) {
                    if (result.data.state === true) {
                        location.href = "/login";
                    } else {
                        vm.errors.push(result.data.message);
                    }
                });
            }
        }
    }
}
</script>
<style>
</style>

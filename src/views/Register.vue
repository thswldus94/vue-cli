<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2">
                        <h3>회원가입</h3>
                    </div>
                    <!-- <div class="btn-wrapper text-center">
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                            <span class="btn-inner--text">Github</span>
                        </a>
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text">Google</span>
                        </a>
                    </div> -->
                    <div class="btn-wrapper text-left">
                        <div v-if="errors.length">
                            <h4 class="danger" v-for="error in errors" v-bind:key="error.id"><mark>{{ error }}</mark></h4>
                        </div>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <!-- <div class="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                    </div> -->
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="ID"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.id">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="이메일"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="비밀번호"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="비밀번호 재확인"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password2">
                        </base-input>

                        <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative" v-model="model.agree">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="checkForm()">회원가입</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'register',
    data() {
      return {
        model: {
          id: '',
          email: '',
          password: '',
          password2: '',
          agree: false
        },
        errors: []
      }
    },
    methods: {
        checkForm: function(e) {
            this.errors = [];
            if (!this.model.id) this.errors.push("ID는 필수사항 입니다.");
            if (!this.model.password) this.errors.push("비밀번호를 입력 해 주세요.");
            if (this.model.password !== this.model.password2) this.errors.push("비밀번호가 다릅니다.");
            if (this.model.email.length > 0) {
                if (!this.validEmail(this.model.email)) {
                    this.errors.push("이메일 형식이 올바르지 않습니다.");
                }
            }

            if (!this.errors.length) {
                this.$http.post('/add', {
                    addType : 'register',
                    id: this.model.id,
                    email: this.model.email,
                    password: this.model.password,
                    agree: this.model.agree ? 1 : 0
                });
            }
        },
        validEmail: function(email) {
            var regex = /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        }
    }
  }
</script>
<style>
</style>

<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            ssdfsdfsdf
        </base-header>
        <!-- Card stats -->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header border-0">
                            <base-alert type="warning">
                                <span class="alert-inner--icon"><i class="ni ni-notification-70 mr-2"></i> </span>
                                <span class="alert-inner--text"><strong>Notice!</strong> Socket.io를 이용한 채팅 프로그램</span>
                            </base-alert>
                        </div>

                        <div class="card-body border-0">
                            <base-alert type="default" id="chat-list">
                                <strong>어서와유!</strong> 잠깐 쉬었다 가슈!
                                <div v-for="(c, index) in chat" v-bind:key="index" class="chat-div pt-1">
                                    <template>
                                        <span v-bind:class="c.class">{{ c.content }}</span>
                                    </template>
                                </div>
                                
                            </base-alert>

                            <form role="form" v-on:submit.prevent="sendMessage()">
                                <div class="row">
                                    <div class="col-2">
                                        <base-input placeholder="아이디" v-model="form.id" name="id"></base-input>
                                    </div>
                                    <div class="col-7">
                                        <base-input placeholder="메시지" v-model="form.message" name="message"></base-input>
                                    </div>
                                    <div class="col-3">
                                        <base-button outline type="info" nativeType="submit">전송</base-button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
const socket = io('/socket');

export default {
    name: 'chat',
    data() {
        return {
            form: {
                id: '',
                message: ''
            },
            chat: []
        }
    },
    methods: {
        sendMessage() {
            socket.emit('send', {
                name: this.form.id,
                message: this.form.message
            });
        }
    },
    mounted() {
        var vm = this;
        socket.on("new_connect", function(name) {
            vm.chat.push({
                class: 'chat-notice',
                content: name + ' 님이 입장하였습니다.'
            });
        });

        socket.on("create_name", function(name) {
            vm.chat.push({
                class: 'chat-notice',
                content: name + ' 으로 채팅을 시작합니다.'
            });
        });

        socket.on("change_name", function(oldname, newname) {
            vm.chat.push({
                class: 'chat-notice',
                content: oldname + ' 님이 ' + newname + ' 님으로 아이디를 변경했습니다.'
            });
        });

        socket.on('receiveMessage', function(msg) {   // 메세지를 받았을 때 - 4
            vm.chat.push({
                class: 'chat-box',
                content: msg
            });
        });

        socket.on('new_disconnect', function(name) {   // 메세지를 받았을 때 - 4
            vm.chat.push({
                class: 'chat-notice',
                content: name + ' 님이 퇴장하였습니다.'
            });
        });
    }
};
</script>
<style>
#chat-list {
    width: 100%;
    height: 500px;
    border: 1px solid #e0e0e0;
}
.chat-div {
    height: 30px;
}
.chat-box {
    background-color: #ffe812;
    border-radius: 3px;
    color: #000;
    padding: 5px;
    height: 26px;
}
</style>
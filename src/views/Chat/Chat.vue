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
                                <strong>Default!</strong> This is a default alert—check it out!
                                <p class="chat-box" v-for="c in chat" v-bind:key="chat.id">{{ c }}</p>
                            </base-alert>

                            <div class="row">
                                <form role="form" v-on:submit.prevent="sendMessage()">
                                    <div class="col-sm-12">
                                        <base-input placeholder="아이디" addon-left-icon="ni ni-zoom-split-in" v-model="form.id" name="id"></base-input>
                                    
                                        <base-input placeholder="메시지" v-model="form.message" name="message"></base-input>

                                        <base-button outline type="info" nativeType="submit">전송</base-button>
                                    </div>
                                </form>
                            </div>
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
            console.log('123');
    
            socket.emit('send', {
                name: this.form.id,
                message: this.form.message
            });
        }
    },
    mounted() {
        var vm = this;
        socket.on("connect", function() {
            console.log('연결연결');
        });

        socket.on('receiveMessage', function(msg){   // 메세지를 받았을 때 - 4
            console.log(msg);
            
            vm.chat.push(msg);
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
.chat-box {
    background-color: #ffe812;
    border-radius: 3px;
    color: #000;
    padding: 5px;
}
</style>
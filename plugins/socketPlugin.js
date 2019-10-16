import Vue from 'vue';
import io from 'socket.io-client';

const socket = io('https://127.0.0.1:3000/socket');

const SocketPlugin = {
    install(vue) {
        vue.mixin({});

        vue.prototype.$sendMessage = ($payload) => {
            socket.emit('send', {
                name: $payload.name,
                message: $payload.message
            });
        }

        // 인스턴스 메소드 추가
        vue.prototype.$socket = socket;
    }
}

Vue.use(SocketPlugin);
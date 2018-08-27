import Vue from 'vue'
import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        token: '',
        username: '',
        personData: {
            username: '',
            password: '',
            email: '',
            avatar: ''
        }
    },
    mutations: {
        set_username(state, username) {
            state.username = username;
            sessionStorage.setItem('username', username)
        },
        set_token(state, token) {
            state.token = token;
            sessionStorage.token = token;
        },
        del_token(state) {
            state.token = '';
            sessionStorage.removeItem('token');
        }
    },
    actions: {

    }
})
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        toast: {
            visible: false,
            message: '',
            type: ''
        },
        user: {
            loggedIn: false,
            data: null
        },
    },
    getters: {
        user: state => state.user,
    },
    actions: {
        showToast(state, payload) {
            state = state.state
            console.log(state, payload);
            state.toast.visible = true;
            state.toast.message = payload.message;
            state.toast.type = payload.type;

            setTimeout(() => {
                state.toast.visible = false;
            }, 3000);
        },
        hideToast(state) {
            state.toast.visible = false;
        },
        setLoggedIn(state, payload) {
            state = state.state
            state.user.loggedIn = payload;
            console.log(state.user.loggedIn);
        },
        setUser(state, payload) {
            state = state.state
            state.user.data = payload;
            console.log(state.user.data);
        }
    },
})
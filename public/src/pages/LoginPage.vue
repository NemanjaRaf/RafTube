<template>
    <page-template>
        <div class="row center mt-5">
            <div class="col-4">
                <div class="card bg-light p-3">
                    <div class="form-group">
                        <label for="">Email</label>
                        <input type="text" class="form-control" v-model="email">
                    </div>
                    <div class="form-group mt-3">
                        <label for="">Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>

                    <div class="col mt-3">
                        <div class="btn btn-primary" @click="login">Login</div>
                    </div>
                </div>
            </div>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from './PageTemplate.vue'
export default {
  components: { PageTemplate },
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            axios.post(this.API_URL + '/user/login', {
                email: this.email,
                password: this.password
            }).then((res) => {
                if (res.data.success) {
                    this.$store.dispatch('showToast', { message: "Successfull login", type: 'success' });
                    let token = res.data.data.token
                    let user = res.data.data.user

                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    this.$router.push('/')
                } else {
                    this.$store.dispatch('showToast', { message: res.data.message, type: 'error' });
                }
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    }
}
</script>

<style>
</style>
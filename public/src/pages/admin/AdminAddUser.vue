<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />

            <div class="p-3">
                <div class="row">
                    <div class="col-3">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" v-model="username">
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-3">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" v-model="email">
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-3">
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" v-model="password">
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <div class="btn btn-green" @click="createUser">Create</div>
                    </div>
                </div>
            </div>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import AdminNav from '../../components/AdminNav.vue'
import PageTemplate from '../PageTemplate.vue'
export default {
  components: { PageTemplate, AdminNav },
    name: 'AdminAddUser',
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        createUser() {
            axios.post(this.API_URL + '/user/create', {
                username: this.username,
                email: this.email,
                password: this.password
            }).then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    this.$router.push('/admin/users')
                    this.$store.dispatch('showToast', { message: "User created", type: 'success' });
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
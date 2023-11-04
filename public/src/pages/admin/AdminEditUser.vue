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
                        <div class="btn btn-blue" @click="updateUser">Update</div>
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
    name: 'AdminEditUser',
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        getUser() {
            axios.get(this.API_URL + '/user/' + this.$route.params.id, {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res.data)
                this.username = res.data.data.username
                this.email = res.data.data.email
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        },
        updateUser() {
            let data = {}
            if (this.username != '') {
                data.username = this.username.trim()
            }
            if (this.email != '') {
                data.email = this.email.trim()
            }
            if (this.password != '') {
                data.password = this.password.trim()
            }
            axios.put(this.API_URL + '/user/' + this.$route.params.id, data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.$store.dispatch('showToast', { message: 'User updated successfully.', type: 'success' });
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>

<style>
</style>
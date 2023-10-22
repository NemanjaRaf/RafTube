<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />

            <div class="card-body">

                <div class="row">
                    <div class="col-md-6">
                        <h3>Users</h3>
                    </div>

                    <div class="col-md-6">
                        <router-link to="/admin/users/add" style="float:right">
                            <button class="btn btn-green">Create User</button>
                        </router-link>
                    </div>
                </div>

                <table class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th style="text-align:center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="user in users" :key="user._id">
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.type }}</td>
                            <td style="text-align:center">
                                <router-link :to="'/admin/users/' + user._id">
                                    <button class="btn btn-green">Edit</button>
                                </router-link>
                                <button class="btn btn-primary ml-1" @click="deleteUser(user._id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from '../PageTemplate.vue'
import AdminNav from '../../components/AdminNav.vue'
export default {
  components: { PageTemplate, AdminNav },
    name: 'AdminUsers',
    data() {
        return {
            users: []
        }
    },
    methods: {
        getUsers() {
            axios.get('http://localhost:3000/api/user/list')
                .then(response => {
                    this.users = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteUser(id) {
            axios.delete('http://localhost:3000/api/user/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
                })
                .then(response => {
                    console.log(response.data)
                    this.getUsers()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>

<style>
.table {
    color: white !important;
    border-color: rgb(16, 16, 16);
}
.table > :not(caption) > * > * {
    background: #1c1c1c;
}

th,td {
    color: #fff !important;
}
</style>
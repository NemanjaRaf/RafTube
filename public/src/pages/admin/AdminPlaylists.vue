<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />

            <div class="card-body">

                <div class="row">
                    <div class="col-md-6">
                        <h3>Playlists</h3>
                    </div>

                    <!-- <div class="col-md-6">
                        <router-link to="/admin/users/add" style="float:right">
                            <button class="btn btn-green">Create User</button>
                        </router-link>
                    </div> -->
                </div>

                <table class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Channel</th>
                            <th>Video</th>
                            <th>Comment</th>
                            <th style="text-align:center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="p in playlists" :key="p._id">
                            <td>{{ p.title }}</td>
                            <td class="td-user">
                                <img :src="'https://ui-avatars.com/api/?name='+p.author.username+'&background=random'">
                                {{ p.author.username }}
                            </td>
                            <td>{{ p.description }}</td>
                            <td style="text-align:center">
                                <router-link :to="'/admin/playlists/' + p._id">
                                    <button class="btn btn-green">Edit</button>
                                </router-link>
                                <button class="btn btn-primary ml-1" @click="deletePlaylist(p._id)">Delete</button>
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
    name: 'AdminPlaylists',
    data() {
        return {
            playlists: []
        }
    },
    methods: {
        getPlaylists() {
            axios.get(this.API_URL + '/playlist/list/all').then(response => {
                this.playlists = response.data.data
            }).catch(error => {
                this.$store.dispatch('showToast', { message: error.response.data.message, type: 'error' });
            })
        },
        deletePlaylist(id) {
            axios.delete(this.API_URL + '/playlist/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.$store.dispatch('showToast', { message: 'Playlist deleted', type: 'success' });
                this.getPlaylists()
            }).catch(error => {
                this.$store.dispatch('showToast', { message: error.response.data.message, type: 'error' });
            })
        }
    },
    mounted() {
        this.getPlaylists()
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

.td-user {
    display: flex;
    align-items: center;
}

.td-user img {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    margin-right: 10px;
}
</style>
<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />

            <div class="card-body">

                <div class="row">
                    <div class="col-md-6">
                        <h3>Videos</h3>
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
                            <th>Title</th>
                            <th>Description</th>
                            <th>Channel</th>
                            <th style="text-align:center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="video in videos" :key="video._id">
                            <td>{{ video.title }}</td>
                            <td class="td-user">
                                <img :src="'https://ui-avatars.com/api/?name='+video.channel.username+'&background=random'">
                                {{ video.channel.username }}
                            </td>
                            <td>{{ video.description }}</td>
                            <td style="text-align:center">
                                <router-link :to="'/admin/videos/' + video._id">
                                    <button class="btn btn-green">Edit</button>
                                </router-link>
                                <button class="btn btn-primary ml-1" @click="deleteVideo(video._id)">Delete</button>
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
    name: 'AdminVideos',
    data() {
        return {
            videos: []
        }
    },
    methods: {
        getVideos() {
            axios.get(this.API_URL + '/video/search/100').then(response => {
                this.videos = response.data.data
                console.log(this.videos)
            }).catch(error => {
                this.$store.dispatch('showToast', { message: error.response.data.message, type: 'error' });
            })
        },
        deleteVideo(id) {
            axios.delete(this.API_URL + '/video/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.$store.dispatch('showToast', { message: 'Video deleted', type: 'success' });
                this.getVideos()
            }).catch(error => {
                this.$store.dispatch('showToast', { message: error.response.data.message, type: 'error' });
            })
        }
    },
    mounted() {
        this.getVideos()
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
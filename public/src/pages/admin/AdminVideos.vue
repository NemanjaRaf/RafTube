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
                            <th style="text-align:center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="video in videos" :key="video._id">
                            <td>{{ video.title }}</td>
                            <td>{{ video.description }}</td>
                            <td style="text-align:center">
                                <router-link :to="'/admin/videos/' + video._id">
                                    <button class="btn btn-green">Edit</button>
                                </router-link>
                                <button class="btn btn-primary ml-1" @click="deleteUser(video._id)">Delete</button>
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
            axios.get('http://localhost:3000/api/video/search/100').then(response => {
                this.videos = response.data.data
                console.log(this.videos)
            }).catch(error => {
                alert(error.response.data.message)
            })
        },
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
</style>
<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />

            <div class="p-3">
                <div class="row">
                    <div class="col-3">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" v-model="title">
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="" id="" cols="30" rows="5" v-model="desc"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-3">
                        <div class="form-group">
                            <label>Channel</label>
                            <select name="" id="" v-model="owner">
                                <option disabled>Select Channel</option>
                                <option v-for="channel in channels" :key="channel._id" :value="channel._id">
                                    {{ channel.username }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <div class="btn btn-blue" @click="updatePlaylist">Update</div>
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
    name: 'AdminEditPlaylist',
    data() {
        return {
            title: '',
            desc: '',
            owner: '',
            channels: []
        }
    },
    methods: {
        getPlaylist() {
            axios.get(this.API_URL + '/playlist/' + this.$route.params.id, {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then((res) => {
                this.title = res.data.data.title
                this.desc = res.data.data.description
                this.owner = res.data.data.author._id
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        },
        getAllUsers() {
            axios.get(this.API_URL + '/user/list', {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res.data)
                this.channels = res.data.data
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        },
        updatePlaylist() {
            let data = {}
            if (this.title != '') {
                data.title = this.title.trim()
            }
            if (this.desc != '') {
                data.description = this.desc.trim()
            }
            if (this.owner != '') {
                data.author = this.owner.trim()
            }

            axios.put(this.API_URL + '/playlist/' + this.$route.params.id, data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.$store.dispatch('showToast', { message: 'Playlist updated successfully.', type: 'success' });
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    },
    mounted() {
        this.getPlaylist()
        this.getAllUsers()
    }
}
</script>

<style>
</style>
<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />

            <div class="p-3">

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
                    <div class="col-6">
                        <div class="form-group">
                            <label>Comment</label>
                            <textarea name="" id="" cols="30" rows="5" v-model="comment"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <div class="btn btn-blue" @click="updateComment">Update</div>
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
            comment: '',
            owner: '',
            channels: []
        }
    },
    methods: {
        getComment() {
            axios.get(this.API_URL + '/video/comment/single/' + this.$route.params.id, {}).then((res) => {
                console.log('sadsadsa', res.data.data)
                this.comment = res.data.data.text
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
        updateComment() {
            let data = {}
            if (this.comment != '') {
                data.text = this.comment.trim()
            }
            if (this.owner != '') {
                data.author = this.owner.trim()
            }

            axios.put(this.API_URL + '/video/comment/' + this.$route.params.id, data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.$store.dispatch('showToast', { message: 'Comment updated successfully.', type: 'success' });
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    },
    mounted() {
        this.getComment()
        this.getAllUsers()
    }
}
</script>

<style>
</style>
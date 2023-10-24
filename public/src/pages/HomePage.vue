<template>
    <page-template>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <video-preview v-for="video in videos" :key="video._id" :small="true" :data="video"></video-preview>
                </div>
            </div>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from './PageTemplate.vue'
import VideoPreview from '../components/VideoPreview.vue'

export default {
    components: { PageTemplate, VideoPreview },
    name: 'HomePage',
    data() {
        return {
            videos: []
        }
    },
    methods: {
        getVideos() {
            axios.get(this.API_URL + '/video/search/100').then((res) => {
                this.videos = res.data.data
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    },
    mounted() {
        this.getVideos()
    }
}
</script>

<style>
.content {
    height: 100vh;
    overflow-y: auto;
}
</style>
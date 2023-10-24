<template>
    <page-template>
       <div class="row">
            <div class="col-6">
                <video-preview v-for="v in videos" :key="v._id" :col="'col-12'" :data="v" :horizontal="true"></video-preview>
            </div>
       </div>
       <div class="absolute-center" v-if="(videos.length == 0)">
            <h1>No videos for this query</h1>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import VideoPreview from '../components/VideoPreview.vue'
import PageTemplate from './PageTemplate.vue'
export default {
    components: { PageTemplate, VideoPreview },
    name: 'SearchPage',
    data() {
        return {
            videos: []
        }
    },
    methods: {
        getVideos() {
            axios.get(this.API_URL + '/video/search/100/' + this.$route.params.id)
                .then(res => {
                    this.videos = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        this.getVideos()
    },
    watch: {
        '$route.params.id': function() {
            this.getVideos()
        }
    }
}
</script>

<style>
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-25%, -50%);
    text-align: center;
}
</style>
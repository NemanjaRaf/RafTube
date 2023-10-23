<template>
    <page-template>
        <div class="row">
            <div class="col-3 left-metadata">
                <div class="card bg-light p-3">
                    <h3>{{ playlist.title }}</h3>

                    <div class="divider"></div>

                    <div class="channel">
                        <div class="logo">
                            <img :src="'https://ui-avatars.com/api/?name='+playlist.author.username+'&background=random'" alt="">
                        </div>
                        <router-link class="title" :to="'/channel/' + playlist.author._id">{{ playlist.author.username }}</router-link>
                    </div>

                    <div class="btn btn-green mt-3">Follow</div>

                    <div class="divider"></div>

                    <div class="d-flex">
                        <h6>Description</h6> 
                        <font-awesome-icon :icon="['fas', 'pencil']" style="float:right;margin-left:auto" />
                    </div>
                    <div class="description text-muted text-small">
                        {{ playlist.description }}
                    </div>
                </div>
            </div>
            <div class="col-6">
                <video-preview v-for="v in videos" :key="v._id" :data="v" :horizontal="true"></video-preview>
            </div>
            
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from './PageTemplate.vue'
import VideoPreview from '../components/VideoPreview.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

library.add(faPencil);

export default {
    components: { PageTemplate, VideoPreview, FontAwesomeIcon },
    name: 'PlaylistPage',
    data() {
        return {
            videos: [],
            playlist: {}
        }
    },
    methods: {
        getPlaylist() {
            axios.get(this.API_URL + '/playlist/' + this.$route.params.id)
                .then(res => {
                    this.videos = res.data.data.videos
                    this.playlist = res.data.data
                }).catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        this.getPlaylist()
    },
    watch: {
        $route() {
            this.getPlaylist()
        }
    }
}
</script>

<style scoped>
.left-metadata {
    position: sticky;
    height: 100%;
}

.channel {
    display: flex;
    align-items: center;
    font-size: 1.1em;
}

.channel .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
}

a {
    color: #fff;
    text-decoration: none;
}
</style>
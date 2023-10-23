<template>
    <page-template>
        <div class="row">
            <div class="col-xl-9 col-lg-8 col-md-8">
                <div class="row">
                    <div class="col-12">
                        <div class="card video bg-dark">
                            <video-player :source="CLOUD_URL + 'videos/' + video.videoUrl + '.mp4'" :view="view"></video-player>
                        </div>
                    </div>

                    <div class="col-12 mt-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5>{{ video.title }}</h5>
                            <div class="btn btn-blue btn-small" @click="libraryModal = true">Save video</div>
                        </div>
                    
                        <div class="d-flex justify-content-between align-items-center mt-1">
                            <div class="views">{{ video.views.length }} views • {{ timeAgo(video.createdAt) }}</div>
                            <div class="likes">
                                <font-awesome-icon :class="liked" @click="like" :icon="['fas', 'fa-thumbs-up']" /> {{ likes.length }}
                                <font-awesome-icon :class="disliked" @click="dislike" :icon="['fas', 'fa-thumbs-down']" /> {{ dislikes.length }}
                            </div>
                        </div>  

                        <div class="divider"></div>

                        <div class="channel d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <div class="logo">
                                    <img :src="'https://ui-avatars.com/api/?name='+video.channel.username+'&background=random'" alt="">
                                </div>
                                <div class="name-page">
                                    <router-link class="title" :to="'/channel/' + video.channel._id">{{ video.channel.username }}</router-link>
                                    <div class="subscribers text-muted text-small">{{ video.channel.subscribers.length }} Subscribers</div>
                                </div>
                            </div>
                            <div class="subscribe">
                                <button class="btn btn-danger" v-if="!subscribed" @click="subscribe">Subscribe</button>
                                <button class="btn btn-gray" v-if="subscribed" @click="unsubscribe">Unsubscribe</button>
                            </div>
                        </div>

                        <!-- video description -->

                        <div class="description text-muted text-small mt-3">
                            {{ video.description }}
                        </div>
                    </div>

                    <comment-section :video="video"></comment-section>
                </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-8">
                <div class="row">
                    <div class="col-12">
                        <video-preview v-for="v in videos" :key="v._id" :data="v"></video-preview>
                    </div>
                </div>
            </div>
        </div>

        <library-modal :show="libraryModal" @close="libraryModal = false"></library-modal>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from './PageTemplate.vue'
import VideoPreview from '../components/VideoPreview.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import CommentSection from '../components/CommentSection.vue'
import LibraryModal from '../components/LibraryModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faThumbsDown);

export default {
    components: { PageTemplate, VideoPreview, VideoPlayer, CommentSection, FontAwesomeIcon, LibraryModal },
    name: 'VideoPage',
    data() {
        return {
            video: {},
            videos: [],
            liked: '',
            disliked: '',
            likes: [],
            dislikes: [],
            updater: 0,

            subscribed: false,
            libraryModal: false,
        }
    },
    methods: {
        getVideo() {
            axios.get(this.API_URL + '/video/' + this.$route.params.id)
                .then(res => {
                    this.video = res.data.data
                    this.likes = res.data.data.likes
                    this.dislikes = res.data.data.dislikes

                    this.subscribed = false
                    this.disliked = ''
                    this.liked = ''

                    const user = JSON.parse(localStorage.getItem('user'))
                    if (this.video.likes.includes(user._id)) {
                        this.liked = 'active'
                        this.disliked = ''
                    } else if (this.video.dislikes.includes(user._id)) {
                        this.disliked = 'active'
                        this.liked = ''
                    }

                    if (this.video.channel.subscribers.includes(user._id)) {
                        this.subscribed = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getVideos() {
            axios.get(this.API_URL + '/video/search/100')
                .then(res => {
                    this.videos = res.data.data

                })
                .catch(err => {
                    console.log(err)
                })
        },
        like() {
            axios.post(this.API_URL + '/video/like/' + this.video._id, {

            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.updater++
            }).catch(err => {
                console.log(err)
            })
        },
        dislike() {
            axios.post(this.API_URL + '/video/dislike/' + this.video._id, {

            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.updater++
            }).catch(err => {
                console.log(err)
            })
        },
        view() {
            axios.post(this.API_URL + '/video/view/' + this.video._id, {}, {
                headers: {
                    Authorization: 'Bearer ' + (localStorage.getItem('token') || '')
                }
            })
        },
        subscribe() {
            axios.post(this.API_URL + '/user/subscribe/' + this.video.channel._id, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.subscribed = true
                this.updater++
            }).catch(err => {
                console.log(err)
            })
        },
        unsubscribe() {
            axios.post(this.API_URL + '/user/unsubscribe/' + this.video.channel._id, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.subscribed = false
                this.updater++
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.getVideo()
        this.getVideos()
    },
    watch: {
        '$route.params.id': function () {
            this.getVideo()
            this.getVideos()
        },
        updater: function () {
            this.getVideo()
        }
    }
}
</script>

<style scoped>
.content {
    height: 100vh;
    overflow-y: auto;
}

.comment-input .logo {
    overflow: hidden;
    border-radius: 50px;
    height: 35px;
    display: inline-block;
    margin-right: 10px;
}

.comment-input .logo img {
    height: 100%;
}

.w-100 {
    width: 100%;
}

.comments .card {
    border: none;
}

.comment .text {
    padding: 0 10px;
    font-size: 0.9em;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.comment .logo {
    overflow: hidden;
    border-radius: 50px;
    height: 35px;
}

.comment .logo img {
    height: 100%;
}

.channel .logo {
    overflow: hidden;
    border-radius: 50px;
    height: 40px;
    display: inline-block;
    margin-right: 10px;
}

.channel .logo img {
    height: 100%;
}

.channel .name-page {
    display: flex;
    flex-direction: column;
    line-height: 1.1rem;
}

.channel .name-page a {
    color: white;
    text-decoration: none;
}

.channel .subscribe-btn {
    margin-left: auto;
    justify-self: end;

}

.channel-name {
    margin-top: 20px;
}

.likes .active {
    color: #3ea6ff;
}
</style>
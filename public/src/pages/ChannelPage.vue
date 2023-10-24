<template>
    <page-template>
        <div class="row">
            <div class="col-12 d-flex channel">
                <div class="logo">
                    <img :src="'https://ui-avatars.com/api/?name='+user.username+'&background=random'" alt="">
                </div>

                <div class="channel-name">
                    <h3>{{ user.username }}</h3>
                    <p>{{ user.subscribers.length }} Subscriber{{ user.subscribers.length == 1 ? '' : 's' }}</p>
                </div>

                <div class="subscribe-btn">
                    <button class="btn btn-danger" v-if="!subscribed" @click="subscribe">Subscribe</button>
                    <button class="btn btn-gray" v-if="subscribed" @click="unsubscribe">Unsubscribe</button>
                </div>
            </div>
        </div>

        <div class="divider mt-2 mb-4"></div>

        <div class="row">
            <div class="col-8">
                <div class="row">
                    <video-preview v-for="v in videos" :key="v._id" :col="'col-4'" :data="v"></video-preview>
                </div>
            </div>
            <div class="col-4">
                <div class="card bg-light p-3">
                    <h4>{{ user.username }}'s playlists</h4>
                    <div class="divider"></div>
                    <div class="row">
                        <div class="col-12">
                            <playlist-preview v-for="p in playlists" :key="p._id" :data="p" :horizontal="true"></playlist-preview>
                        </div>
                    </div>
                    <h4 class="mt-3">{{ user.username }}'s subscriptions</h4>
                    <div class="divider"></div>
                    <div class="row">
                        <div class="col-12">
                            <subscriptions-item v-for="s in user.subscribers" :key="s._id" :data="s"></subscriptions-item>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from './PageTemplate.vue'
import VideoPreview from '../components/VideoPreview.vue'
import PlaylistPreview from '../components/PlaylistPreview.vue'
import SubscriptionsItem from '../components/SubscriptionsItem.vue'
export default {
    components: { PageTemplate, VideoPreview, PlaylistPreview, SubscriptionsItem },
    name: 'ChannelPage',
    data() {
        return {
            videos: [],
            user: {},
            user_id: "",
            subscribed: false,
            playlists: []
        }
    },
    methods: {
        getVideos() {
            axios.get(this.API_URL +  '/video/channel/' + this.user_id)
                .then(res => {
                    console.log('data', res.data.data)
                    this.videos = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getUser() {
            axios.get(this.API_URL + '/user/' + this.user_id)
                .then(res => {
                    this.user = res.data.data

                    if (this.isLoggedIn()) {
                        console.log('subscribers', this.user.subscribers)
                        const u = JSON.parse(localStorage.getItem('user'))
                        let found = false;
                        for (let i = 0; i < this.user.subscribers.length; i++) {
                            if (this.user.subscribers[i]._id == u._id) {
                                console.log('subscribed', this.user.subscribers[i]._id, u._id)
                                this.subscribed = true
                                found = true
                                break
                            }
                        }
                        if (!found) {
                            this.subscribed = false
                        }
                    } else {
                        this.subscribed = false
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getPlaylists() {
            axios.get(this.API_URL +  '/playlist/list/' + this.user_id)
                .then(res => {
                    this.playlists = res.data.data.playlistsByAuthor
                    console.log('playlists', this.playlists)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        subscribe() {
            axios.post(this.API_URL + '/user/subscribe/' + this.user_id, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                this.getUser()
            })
            .catch(err => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        },
        unsubscribe() {
            axios.post(this.API_URL + '/user/unsubscribe/' + this.user_id, {}, {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                this.getUser()
            })
            .catch(err => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    },
    created() {
        if (this.$route.params.id) {
            this.user_id = this.$route.params.id
        } else {
            const u = JSON.parse(localStorage.getItem('user'))
            if (!u) {
                this.$router.push('/')
                return;
            }
            this.user_id = u._id
        }

        this.getUser()

        this.getVideos()
        this.getPlaylists()
    },
    watch: {
        '$route.params.id': function () {
            this.user_id = this.$route.params.id
            this.getUser()
            this.getVideos()
            this.getPlaylists()
        }
    }
}
</script>

<style>
.content {
    height: 100vh;
    overflow-y: auto;
}
.channel .logo {
    overflow: hidden;
    border-radius: 50px;
    height: 60px;
    display: inline-block;
    margin-right: 10px;
}

.channel .logo img {
    height: 100%;
}

.channel .name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.1rem;
}

.channel .subscribe-btn {
    margin-left: auto;
    justify-self: end;

}

</style>
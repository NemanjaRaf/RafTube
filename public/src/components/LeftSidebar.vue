<template>
    <div class="sidemenu">
        <div class="d-flex">
            <div class="col-6">
                <div class="logo">
                    <img src="/logo/logo-no-background.png" alt="">
                </div>
            </div>
            <div class="col-6 center">
                <font-awesome-icon :icon="['fas', 'times']" class="close-btn" @click="closeMenu"/>
            </div>
        </div>

        <div class="nav">
            <ul>
                <router-link to="/">
                    <li class="nav-item active">
                        <font-awesome-icon :icon="['fas', 'home']" /> Home
                    </li>
                </router-link>

                <router-link to="/upload" v-if="isLoggedIn()">
                    <li class="nav-item">
                        <font-awesome-icon :icon="['fas', 'upload']" /> Upload Video
                    </li>
                </router-link>

                <router-link to="/channel" v-if="isLoggedIn()">
                    <li class="nav-item">
                        <font-awesome-icon :icon="['fas', 'user']" /> Your Channel
                    </li>
                </router-link>

                <router-link to="/admin" v-if="admin">
                    <li class="nav-item admin">
                        <font-awesome-icon :icon="['fas', 'user']" /> Admin Panel
                    </li>
                </router-link>

            </ul>
        </div>
        <div class="divider"></div>
        <div class="nav">
            <ul v-if="isLoggedIn()">
                <li class="nav-item">
                    <font-awesome-icon :icon="['fas', 'list']" /> Your Library
                </li>
                <PlaylistItem v-for="p in playlists" :key="p._id" :data="p"></PlaylistItem>
            </ul>
            <ul v-if="isLoggedIn()">
                <li class="nav-item">
                    <font-awesome-icon :icon="['fas', 'list']" /> Following
                </li>
                <PlaylistItem v-for="f in following" :key="f._id" :data="f"></PlaylistItem>
            </ul>
            <ul v-if="isLoggedIn()">
                <li class="nav-item">
                    <font-awesome-icon :icon="['fas', 'user-astronaut']" /> Your Subscriptions
                </li>
                <subscriptions-item v-for="s in subscriptions" :key="s._id" :data="s"></subscriptions-item>
            </ul>

            <router-link :to="'/login'" class="down btn btn-primary" v-if="!isLoggedIn()" @click="closeMenu()">
                Login
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import SubscriptionsItem from './SubscriptionsItem.vue'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faHome, faUpload, faUser, faList, faUserAstronaut, faTimes } from '@fortawesome/free-solid-svg-icons';
    import PlaylistItem from './PlaylistItem.vue';

    library.add(faHome, faUpload, faUser, faList, faUserAstronaut, faTimes);
    
    export default {
        name: 'LefSidebar',
        components: {
            FontAwesomeIcon, SubscriptionsItem, PlaylistItem
        },
        data() {
            return {
                admin: false,
                subscriptions: [],
                playlists: [],
                following: []
            }
        },
        methods: {
            checkAdmin() {
                try {
                    const t = localStorage.getItem('token')
                    const token = JSON.parse(window.atob(t.split('.')[1]));

                    if (token.role === 'admin') {
                        this.admin = true
                        return
                    }
                } catch (e) {
                    return 
                }
            },
            listSubscriptions() {
                const user = this.isLoggedIn()
                if (!user) return;
                console.log('user', user)

                console.log('listing subscriptions')
                axios.get(this.API_URL + '/user/subscriptions/' + user._id)
                    .then(res => {
                        this.subscriptions = res.data.data
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }, 
            getPlaylists() {
                axios.get(this.API_URL + '/playlist/list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    this.playlists = res.data.data.playlistsByAuthor;
                    this.following = res.data.data.playlistsByFollower;
                }).catch(err => {
                    console.log(err);
                })
            },
            closeMenu() {
                this.$emit('close');
            },
        },
        created() {
            this.checkAdmin()
            this.listSubscriptions()
            this.getPlaylists()
        }
    }
</script>

<style>

.sidemenu {
    position: relative;
    background: #262626;
    height: 100vh;
    overflow-y: auto;
    padding: 0 !important;
}

.sidemenu .nav {
    margin-top: 20px;
    width: 100%;
    color: white;
    padding: 0 10px;
}

.sidemenu .nav a {
    color: white;
    text-decoration: none;
}

.sidemenu .nav ul, .sidemenu .nav li {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.sidemenu .nav .nav-item {
    margin-bottom: 0;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    transition: background 0.2s ease-in-out;
}

.sidemenu .close-btn {
    font-size: 1.5em;
    float: right;
    margin-left: auto;
    margin-right: 20px;
}

.sidemenu .nav .nav-item.muted {
    color: #bcbcbc;
    padding: 5px 20px;
    margin-bottom: 0;
}

.sidemenu .nav .nav-item.admin{
    color: rgb(189, 44, 44)
}

.sidemenu .nav-item svg {
    margin-right: 10px;
}

.sidemenu .nav-item:hover, .sidemenu .nav-item.active {
    background: #4d4d4d;

}

.divider {
    border-bottom: 1px solid #4d4d4d;
    margin: 10px auto;
    width: 90%;
}
.sidemenu .logo {
    padding: 20px;
    text-align: center;
}

.sidemenu .logo img{
    width: 100%;
}


.sidemenu .nav-item.subscriptions, .sidemenu .nav-item.playlist {
    padding: 5px 5px;
    margin-left: 20px;
    width: calc(100% - 20px);
    display: flex;
    font-size: 0.9em;
    align-items: center;
}

.sidemenu .nav-item.subscriptions .logo {
    padding: 0;
    width:25px;
    height: 25px;
    border-radius: 50px;
    overflow: hidden;
    margin-right: 10px;
}

.sidemenu .nav-item.subscriptions .logo img {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
}

.sidemenu .down {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    padding: 10px 20px;
}
</style>
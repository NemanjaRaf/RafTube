<template>
<transition name="fade">
  <div class="library" v-if="show">
    <div class="card bg-light">
        <div class="close" @click="close">
            <font-awesome-icon :icon="['fas', 'times']" />
        </div>
        <h5>Select Playlist</h5>
        <ul>
            <li v-for="playlist in playlists" :key="playlist._id" @click="addToPlaylist(playlist._id)">
                <font-awesome-icon :icon="['fas', 'list']" /> {{ playlist.title }}
            </li>
        </ul>
        <div class="btn btn-primary" @click="adding = true" v-if="!adding">Add new</div>
        <div class="form-group" v-if="adding">
            <input type="text" placeholder="Playlist name" v-model="new_name">
        </div>
        <div class="btn btn-primary mt-2" @click="addNew" v-if="adding">Add</div>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faList, faTimes);
export default {
    name: "LibraryModal",
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            adding: false,
            new_name: '',
            playlists: [],
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        addNew() {
            axios.post(this.API_URL + '/playlist/create', {
                title: this.new_name
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.adding = false;
                this.new_name = '';
                this.playlists = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        },
        addToPlaylist(p_id) {
            axios.post(this.API_URL + '/playlist/add/' + p_id, {
                videoId: this.$route.params.id,
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.data.success) {
                    this.$emit('close');
                    this.$store.dispatch('showToast', { message: "Video saved", type: 'success' });
                } else {
                    this.$store.dispatch('showToast', { message: res.data.message, type: 'error' });
                }
            }).catch(err => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }, 
        close() {
            this.$emit('close');
        }
    },
    created() {
        axios.get(this.API_URL + '/playlist/list', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.playlists = res.data.data;
        }).catch(err => {
            console.log(err);
        })
    },
    watch: {
        show: function () {
            console.log(this.show);
        }
    }
};
</script>

<style scoped>
.library {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 100;
}

.library .card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 10px;
}

.library h5 {
    text-align: center;
}

.library ul {
    list-style: none;
    padding: 0;
}

.library ul li {
    padding: 5px 5px;
    border-radius: 3px;
}

.library ul li:hover {
    cursor: pointer;
    background-color: #4d4d4d;
    
}

.library .close {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
}
</style>
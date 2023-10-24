<template>
  <page-template>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 left-metadata mb-3">
        <div class="card bg-light p-3">
          <h3>{{ playlist.title }}</h3>

          <div class="divider"></div>

          <div class="channel">
            <div class="logo">
              <img
                :src="
                  'https://ui-avatars.com/api/?name=' +
                  playlist.author.username +
                  '&background=random'
                "
                alt=""
              />
            </div>
            <router-link
              class="title"
              :to="'/channel/' + playlist.author._id"
              >{{ playlist.author.username }}</router-link
            >
          </div>

          <div class="btn btn-green mt-3" @click="follow" v-if="!following && !owner">
            Follow
          </div>
          <div class="btn btn-gray mt-3" @click="unfollow" v-if="following || owner">
            Unfollow
          </div>

          <div class="divider"></div>

          <div class="d-flex">
            <h6>Description</h6>
            <font-awesome-icon
              :icon="['fas', 'pencil']"
              style="float: right; margin-left: auto"
              v-if="owner"
              @click="toggleEdit"
            />
          </div>
          <div class="description text-muted text-small" v-if="!editing">
            {{ playlist.description }}
          </div>
          <div class="description text-muted text-small" v-if="editing">
            <div class="form-group">
                <textarea placeholder="Description" v-model="description"></textarea>
                <div class="btn btn-green btn-block mt-1" @click="saveDescription">Save</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <video-preview
          v-for="v in videos"
          :key="v._id"
          :data="v"
          :horizontal="true"
        ></video-preview>
      </div>
    </div>
  </page-template>
</template>

<script>
import axios from "axios";
import PageTemplate from "./PageTemplate.vue";
import VideoPreview from "../components/VideoPreview.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

library.add(faPencil);

export default {
  components: { PageTemplate, VideoPreview, FontAwesomeIcon },
  name: "PlaylistPage",
  data() {
    return {
        videos: [],
        playlist: {},
        following: false,
        owner: false,
        editing: false,
        description: "",
    };
  },
  methods: {
    getPlaylist() {
      axios
        .get(this.API_URL + "/playlist/" + this.$route.params.id)
        .then((res) => {
          this.videos = res.data.data.videos;
          this.playlist = res.data.data;

          this.following = this.playlist.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          );

          this.owner =
            JSON.parse(localStorage.getItem("user"))._id ===
            this.playlist.author._id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    follow() {
        if (!this.isLoggedIn()) {
            this.$store.dispatch('showToast', { message: "You need to be logged in!", type: 'error' });
            return
        }
      axios
        .post(
          this.API_URL + "/playlist/follow/" + this.$route.params.id,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.getPlaylist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollow() {
        if (!this.isLoggedIn()) {
            this.$store.dispatch('showToast', { message: "You need to be logged in!", type: 'error' });
            return
        }
        axios
        .post(
          this.API_URL + "/playlist/unfollow/" + this.$route.params.id,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.getPlaylist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleEdit() {
        this.editing = !this.editing;
        this.description = this.playlist.description;
    },
    saveDescription() {
        axios.put(this.API_URL + '/playlist/' + this.playlist._id, {
            description: this.description
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            this.getPlaylist();
            this.editing = false;
        }).catch(err => {
            console.log(err);
        })
    }
  },
  created() {
    this.getPlaylist();
  },
  watch: {
    $route() {
      this.getPlaylist();
    },
  },
};
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

.channel .logo img {
  width: 100%;
}

a {
  color: #fff;
  text-decoration: none;
}
</style>
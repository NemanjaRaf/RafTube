<template>
  <router-link :class="sizeClass" :to="'/playlist/' + data._id">
    <div :class="{ card: true, 'video-preview': true, horizontal: horizontal }">
      <div class="thumbnail">
        <div class="loader" v-if="!imageLoaded"></div>
        <img
          @load="imageLoad"
          :src="CLOUD_URL + 'thumbnails/' + data.videos[0].thumbnailUrl"
          alt=""
        />

        <div class="thumbnail-info">
          <font-awesome-icon
            :icon="['fas', 'list']"
          />
            {{ data.videos.length }} videos
        </div>
      </div>
      <div class="meta">
        <div class="title">{{ data.title }}</div>
        <div class="metadata">
          <div class="channel">
            <div class="logo">
              <img
                :src="
                  'https://ui-avatars.com/api/?name=' +
                  data.author.username +
                  '&background=random'
                "
                alt=""
              />
            </div>
            {{ data.author.username }}
          </div>
          <div class="views">
            Updated {{ timeAgo(data.updatedAt) }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "PlaylistPreview",
  components: {
    FontAwesomeIcon,
  },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    col: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imageLoaded: false,
      videoPromise: null,
      actionCanceled: false,
      debouncedLoad: null,
      debouncedUnload: null,
    };
  },
  methods: {
    imageLoad() {
      console.log("image loaded");
      this.imageLoaded = true;
    },
  },
  created() {
    console.log(this.data);
  },
  computed: {
    sizeClass() {
      if (this.col !== "") return this.col;
      return this.small ? "col-4 col-lg-3" : "col-12";
    },
  },
};
</script>

<style scoped>
.video-preview, .video-preview .meta  {
    background: none !important;
}
.video-preview.horizontal .thumbnail {
  width: 70%;
  position: relative;
}

.thumbnail-info {
    position: absolute;
    width: 100%;
    padding: 10px;
    background: rgba(76, 76, 76, 0.794);
    bottom: 0px;
    border-radius: 0 0 10px 10px;
    color: black;
}
</style>
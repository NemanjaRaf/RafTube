<template>
  <router-link
    :class="sizeClass"
    :to="'/video/' + data._id"
    @mouseenter.native="loadVideo"
    @mouseleave.native="unloadVideo"
  >
    <div :class="{ card: true, 'video-preview': true, horizontal: horizontal }">
      <div class="thumbnail">
        <div class="loader" v-if="!imageLoaded"></div>
        <!-- <img
          @load="imageLoad"
          :src="CLOUD_URL + 'thumbnails/' + data.thumbnailUrl"
          alt=""
        /> -->
        <video
          ref="video"
          class="thumbnail-video"
          :poster="CLOUD_URL + 'thumbnails/' + data.thumbnailUrl"
          @load="imageLoad"
          @loadeddata="imageLoad"
          muted
          loop
          preload="metadata"
        >
          <source
            :src="CLOUD_URL + 'videos/' + data.videoUrl + '.mp4'"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="meta">
        <div class="title">{{ data.title }}</div>
        <div class="metadata">
          <div class="channel">
            <div class="logo">
              <img
                :src="
                  'https://ui-avatars.com/api/?name=' +
                  data.channel.username +
                  '&background=random'
                "
                alt=""
              />
            </div>
            {{ data.channel.username }}
          </div>
          <div class="views">
            {{ data.views.length }} views • {{ timeAgo(data.createdAt) }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
export default {
  name: "VideoPreview",
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
  computed: {
    sizeClass() {
      if (this.col !== "") return this.col;
      return this.small ? "col-4 col-lg-3" : "col-12";
    },
  },
  methods: {
    imageLoad() {
      console.log("image loaded");
      this.imageLoaded = true;
    },
    loadVideo() {
      this.videoActionCancelled = false;
      this.debouncedLoad();
    },

    unloadVideo() {
      this.videoActionCancelled = true;
      this.debouncedUnload();
    },

    actualLoadVideo() {
      if (this.videoActionCancelled) return;

      console.log("load video");
      const video = this.$refs.video;
      if (video) {
        video.load();

        var isPlaying =
          video.currentTime > 0 &&
          !video.paused &&
          !video.ended &&
          video.readyState > video.HAVE_CURRENT_DATA;
        if (!isPlaying) {
          if (this.videoPromise) {
            this.videoPromise
              .then(() => {
                this.videoPromise = video.play();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.videoPromise = video.play();
          }
        }
      }
    },

    actualUnloadVideo() {
      const video = this.$refs.video;
      if (video) {
        if (this.videoPromise) {
          this.videoPromise
            .then(() => {
              video.pause();
              video.currentTime = 1;
              this.videoPromise = null;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          video.pause();
          video.currentTime = 1;
        }
      }
    },
  },
  created() {
    // Debounce the load and unload functions for better UX
    this.debouncedLoad = debounce(this.actualLoadVideo, 200);
    this.debouncedUnload = debounce(this.actualUnloadVideo, 200);
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2e2e2e;
  border-radius: 10px;
  overflow: hidden;
}
.loader:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-300px);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(100, 100, 100, 0.4),
    transparent
  );
  animation: loading 1.2s infinite;
}
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
.video-preview {
  background: #1c1c1c;
  position: relative;
  border: none;
  margin-bottom: 20px;
  width: 100%;
}
.video-preview.horizontal {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
}
.video-preview .thumbnail {
  width: 100%;
  position: relative;
}

.video-preview.horizontal .thumbnail {
  width: 35%;
  position: relative;
}

.video-preview.small .thumbnail video {
  width: 100%;
  height: 150px;
  object-fit: fill;
}

.video-preview.horizontal .thumbnail video {
  width: 100%;
  height: 150px;
  object-fit: fill;
}
.video-preview .thumbnail video {
  width: 100%;
  height: 200px;
  object-fit: fill;
  border-radius: 10px;
}
.video-preview .meta {
  width: 100%;
  color: white;
  background: #1c1c1c;
  margin-top: 15px;
}

.video-preview.horizontal .meta {
  width: 70%;
  height: 150px;
  padding: 0 10px;
  margin-left: 0;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.video-preview .meta .title {
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 2px;
  margin-top: 5px;
}

.video-preview.horizontal .metadata {
  margin-bottom: 2px;
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.video-preview.horizontal .meta .channel {
  margin-bottom: 5px;
}

.video-preview .meta .channel,
.video-preview .meta .views {
  font-size: 0.9em;
  color: #bcbcbc;
  display: flex;
  align-items: center;
}

.video-preview.horizontal .meta .channel,
.video-preview.horizontal .meta .views {
  font-size: 1em;
  color: #bcbcbc;
  display: flex;
  align-items: center;
}


.video-preview .meta .channel .logo {
   width: 20px;
  height: 20px;
  margin-right: 5px;
}

.video-preview.horizontal .meta .channel .logo {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.video-preview .meta .channel .logo img {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  object-fit: cover;
}
</style>
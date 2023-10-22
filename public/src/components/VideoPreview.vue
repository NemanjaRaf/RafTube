<template>
  <router-link  :class="sizeClass" :to="'/video/' + data._id">
    <div class="card video-preview">
      <div class="thumbnail">
        <div class="loader" v-if="!imageLoaded"></div>
        <img @load="imageLoad" :src="CLOUD_URL + 'thumbnails/' + data.thumbnailUrl" alt="" />
      </div>
      <div class="meta">
        <div class="title">{{ data.title }}</div>
        <div class="channel">{{ data.channel.username }}</div>
        <div class="views">{{ data.views.length }} views • {{ timeAgo(data.createdAt) }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
    name: "VideoPreview",
    props: {
        small: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {}
        },
    },
    data() {
        return {
            imageLoaded: false
        }
    },
    computed: {
      sizeClass() {
        return this.small ? 'col-4 col-lg-3' : 'col-12'
      }
    },
    methods: {
        imageLoad() {
            console.log('image loaded');
            this.imageLoaded = true;
        }
    }
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
  background: linear-gradient(90deg, transparent, rgba(100,100,100,0.4), transparent);
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
    margin-bottom:20px;
}
.video-preview .thumbnail {
    width: 100%;
    position: relative;
}

.video-preview.small .thumbnail img {
    width: 100%;
    height: 150px;
    object-fit: fill;
}
.video-preview .thumbnail img {
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

.video-preview .meta .title {
    font-weight: bold;
    font-size: 1.1em;
}

.video-preview .meta .channel, .video-preview .meta .views {
    font-size: 0.9em;
    color: #bcbcbc;
}
</style>
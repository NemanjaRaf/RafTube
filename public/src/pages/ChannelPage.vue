<template>
    <page-template>
        <div class="row">
            <div class="col-12 d-flex channel">
                <div class="logo">
                    <img src="https://ui-avatars.com/api/?name=Mita+Balija&background=random" alt="">
                </div>

                <div class="channel-name">
                    <h3>Channel Name</h3>
                    <p>100k subscribers</p>
                </div>

                <div class="subscribe-btn">
                    <button class="btn btn-danger">Subscribe</button>
                </div>
            </div>
        </div>

        <div class="divider mt-2 mb-4"></div>

        <div class="row">
            <div class="col-12">
                <div class="row">
                    <video-preview v-for="i in 10" :key="i" :small="true"></video-preview>
                </div>
            </div>
        </div>
    </page-template>
</template>

<script>
import PageTemplate from './PageTemplate.vue'
import VideoPreview from '../components/VideoPreview.vue'
export default {
  components: { PageTemplate, VideoPreview },
    name: 'HomePage',
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
    background: red;
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
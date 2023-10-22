<template>
    <page-template>
        <div class="row">
            <div class="col-12">
                <div class="card bg-light">
                    <div class="card-header">
                        <h4 class="card-title">Upload video</h4>
                    </div>
                    <div class="card-body">
                        <form action="">

                            <div class="row">
                                <div class="col-5">
                                    <div class="row">
                                        <div class="form-group">
                                            <label for="">Title</label>
                                            <input type="text" class="form-control" placeholder="Enter title" v-model="title">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="form-group">
                                            <label for="">Description</label>
                                            <textarea name="" id="" cols="30" rows="3" class="form-control" placeholder="Enter description" v-model="description"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2"></div>


                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card bg-dark video-upload">
                                                <div>Upload video</div>
                                                <div class="btn btn-muted mt-2" @click="openExplorer" v-if="!uploading">Add Video</div>
                                                <img id="video-canvas" style="display: none;">
                                                    <input type="file" hidden id="video_input" @change="handleVideoUpload">
                                                <div class="lds-rings" v-if="uploading">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <div class="btn btn-primary btn-block" @click="uploadVideo">Upload</div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </page-template>
</template>

<script>
import axios from 'axios'
import PageTemplate from './PageTemplate.vue'
export default {
    components: { PageTemplate },
    name: 'UploadPage',
    data() {
        return {
            video: null,
            uploading: false,
            videoID: null,
            title: '',
            description: '',
        }
    },
    methods: {
        openExplorer() {
            document.getElementById('video_input').click()
        },
        handleVideoUpload(e) {
            this.uploading = true
            this.video = e.target.files[0]
            let fd = new FormData()
            fd.append('video', this.video)
            axios.post(this.API_URL + '/video/upload', fd).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    this.$store.dispatch('showToast', { message: "Video uploaded successfully", type: 'success' });
                    document.getElementById('video-canvas').src = res.data.data.thumbnail
                    document.getElementById('video-canvas').style.display = 'block'
                    this.videoID = res.data.data.videoID
                } else {
                    this.$store.dispatch('showToast', { message: res.data.message, type: 'error' });
                }
                this.uploading = false
            }).catch((err) => {
                this.uploading = false
                console.log(err);
            })
        },
        uploadVideo() {
            axios.post(this.API_URL + '/video/create', {
                title: this.title,
                description: this.description,
                videoUrl: this.videoID,
                thumbnailUrl: this.videoID + '.png'
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                if (res.data.success) {
                    this.$store.dispatch('showToast', { message: "Video uploaded successfully", type: 'success' });
                    this.$router.push('/')
                } else {
                    this.$store.dispatch('showToast', { message: res.data.message, type: 'error' });
                }
            }).catch((err) => {
                this.$store.dispatch('showToast', { message: err.response.data.message, type: 'error' });
            })
        }
    }
}
</script>

<style>
.video-upload {
    height: 200px;
    border: 2px dashed #4d4d4d;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.video-upload img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: fill;
    top:0;
    left: 0;
}

.lds-rings {
    display: inline-block;
    position: relative;
    width: 32px;
    height: 32px;
}

.lds-rings div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    margin: 6px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-rings 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}

.lds-rings div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-rings div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-rings div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-rings {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
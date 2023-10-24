<template>
  <video :src="source" controls @play="view"></video>
</template>

<script>
export default {
    name: "VideoPlayer",
    props: {
        source: {
            type: String,
            default: ""
        },
        view: {
            type: Function,
            default: () => {}
        }
    },
}
</script>

<style>
video {
    width: 100%;
    height: 630px;
    background: black;
}
@media screen and (max-width: 1400px) {
    video {
        height: 450px;
    }
}
@media screen and (max-width: 760px) {
    video {
        height: 350px;
    }
}
@media screen and (max-width: 500px) {
    video {
        height: 250px;
    }
}


</style>
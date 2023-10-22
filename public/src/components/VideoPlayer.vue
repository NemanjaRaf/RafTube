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

</style>
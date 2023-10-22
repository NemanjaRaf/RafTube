<template>
    <page-template>
        <div class="absolute-center">
            <img src="/404.png" alt="" width="300px">
            <h1>Page not found</h1>
        </div>
    </page-template>
</template>

<script>
import PageTemplate from './PageTemplate.vue'
export default {
  components: { PageTemplate },
    name: 'NotFound',
}
</script>

<style>
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-25%, -50%);
    text-align: center;
}
</style>
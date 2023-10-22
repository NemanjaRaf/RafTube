<template>
    <div class="container-fluid relative">
        <toast-popup message="test"></toast-popup>
        <div class="row">
            <div class="col-2 p-0">
                <left-sidebar></left-sidebar>
            </div>
            <div class="col-10 content">
                <div class="container-fluid p-3">
                    <top-navigation></top-navigation>
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LeftSidebar from '../components/LeftSidebar.vue'
import TopNavigation from '../components/TopNavigation.vue'
import ToastPopup from '../components/ToastPopup.vue'
export default {
  components: { LeftSidebar, TopNavigation, ToastPopup },
    name: 'PageTemplate',
}
</script>

<style>
.relative {
    position: relative;
}
.content {
    height: 100vh;
    overflow-y: auto;
}
</style>
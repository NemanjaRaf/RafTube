<template>
    <div class="container-fluid relative">
        <toast-popup message="test"></toast-popup>
        <div class="row">
            <div class="col-2 p-0 sidebar-col" :style="{left: sidebarLeft}">
                <left-sidebar @close="closeMenu()"></left-sidebar>
            </div>
            <div class="col-12 col-md-10 col-lg-10 col-xl-10 content">
                <div class="container-fluid p-3">
                    <top-navigation @open="openMenu()"></top-navigation>
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
    data() {
        return {
            sidebarLeft:'-100%'
        }
    },
    methods: {
        closeMenu() {
            console.log('close menu')
            this.sidebarLeft = '-100%'
        },
        openMenu() {
            console.log('open menu')
            this.sidebarLeft = '0'
        }
    }
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

@media screen and (max-width: 768px) {
    .sidebar-col {
        position: fixed;
        z-index: 100;
        height: 100vh;
        width: 100%;
        top: 0;
        transition: left 0.8s ease;
        overflow-x: hidden;
    }

    .sidebar-col .sidemenu img {
        width: 150px;
        overflow-y: auto;
    }
}
@media screen and (min-width: 768px) {
    .bars {
        display: none !important;
    }
    .close-btn {
        display: none !important;
    }
}
</style>
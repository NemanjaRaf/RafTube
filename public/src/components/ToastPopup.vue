<template>
<transition name="fade">
    <div v-if="visible" :class="classes">
        <div class="toast-popup__content">
            <div class="toast-popup__content__message">
            {{ message }}
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'ToastPopup',
    computed: {
        message() {
            return this.$store.state.toast.message;
        },
        type() {
            return this.$store.state.toast.type;
        },
        visible() {
            return this.$store.state.toast.visible;
        },
        classes() {
            return [
                'toast-popup',
                this.type
            ];
        }
    },
    watch: {
        visible(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.$store.commit('hideToast');
                }, 3000);
            }
        }
    }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.toast-popup {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    display: inline-block;
    justify-content: center;
    z-index: 1000;
    padding: 5px 20px;
    font-size: 1.2em;
}

.error {
    background: rgba(255, 87, 87, 0.7);
    border: 1px solid #b13131;
    color: #310808;
}

.success {
    background: rgba(87, 255, 87, 0.7);
    border: 1px solid #31b131;
    color: #083108;
}
</style>
<template>
<div class="col-12 mt-3">
    <div class="card comment bg-dark">
        <div class="row d-flex">
            <div class="center profile-container">
                <div class="logo">
                    <img :src="'https://ui-avatars.com/api/?name='+data.author.username+'&background=random'" alt="">
                </div>
            </div>
            <div class="col p-0">
                <div class="row d-flex">
                    <span>
                        <span class="author text-muted text-small">{{ data.author.username }}</span>
                        <span class="text-muted text-small"> • </span>
                        <span class="date text-muted text-smaller" style="text-align:right">{{ timeAgo(data.createdAt) }}</span>
                        <span class="text-muted text-small" style="float:right">
                            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                        </span>
                    </span>
                </div>
                <div class="text">{{ data.text }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV);
export default {
    name: "SingleComment",
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        FontAwesomeIcon
    },
}
</script>

<style>
    .profile-container {
        width: 59px;
        height: 50px;
        border-radius: 50%;
    }
    .profile-container .logo {
        width: 100%;
        height: 100%;
    }
    .comment .text {
        padding: 0 !important;
    }
</style>
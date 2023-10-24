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
                        <span v-if="data.createdAt != data.updatedAt">
                            <span class="text-muted text-small"> • </span>
                            <span class="date text-muted text-smaller" style="text-align:right"><font-awesome-icon :icon="['fas', 'pencil']" /> Edited</span>
                        </span>
                        <span class="text-muted text-small ml-1">
                            <b-dropdown id="dropdown-ellipsis" text="" variant="text" size="sm" no-caret v-if="isOwner">
                                <template #button-content>
                                    <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
                                </template>

                                <b-dropdown-item @click="deleteComment()">
                                    <font-awesome-icon :icon="['fas', 'trash']" /> Delete
                                </b-dropdown-item>
                                <b-dropdown-item @click="editToggle()">
                                    <font-awesome-icon :icon="['fas', 'pencil']" /> Edit
                                </b-dropdown-item>
                            </b-dropdown>
                        </span>
                    </span>
                </div>
                <div class="text" v-if="!editing">{{ data.text }}</div>
                <div class="form-group" v-if="editing">
                    <input type="text" class="form-control" v-model="text" @keyup.enter="editComment">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faTrash , faPencil);
export default {
    name: "SingleComment",
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            isOwner: false,
            editing: false,
            text: this.data.text
        }
    },
    methods: {
        deleteComment() {
            this.$emit('delete', this.data._id);
        },
        editToggle() {
            this.editing = !this.editing;
        },
        editComment() {
            this.$emit('edit', this.data._id, this.text);
            this.editing = false;
        },
    },
    created: function() {
        if (!this.isLoggedIn()) return;
        const token = localStorage.getItem('token');
        const decoded = JSON.parse(window.atob(token.split('.')[1]));

        this.isOwner = decoded._id == this.data.author._id;
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

    .dropdown .btn svg {
        color: #fff;
    }

    .comment input {
        border-bottom: 1px solid #fff !important;
        border-radius: 0;
    }
</style>
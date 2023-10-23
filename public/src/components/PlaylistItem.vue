<template>
  <router-link :to="'/playlist/' + data._id">
        <li class="nav-item playlist">
            <font-awesome-icon :icon="['fas', 'folder-open']" /> {{ data.title }}
        </li>
    </router-link>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

library.add(faFolderOpen);
export default {
    name: 'PlaylistItem',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        FontAwesomeIcon
    }
}
</script>

<style>

</style>
<template>
  <nav>
    <ul>
        <router-link to="/admin/users">
            <li class="nav-item">
                <font-awesome-icon :icon="['fas', 'user']" /> Users
            </li>
        </router-link>

        <router-link to="/admin/videos">
            <li class="nav-item">
                <font-awesome-icon :icon="['fas', 'video']" /> Videos
            </li>
        </router-link>

        <router-link to="/admin/comments">
            <li class="nav-item">
                <font-awesome-icon :icon="['fas', 'comment']" /> Comments
            </li>
        </router-link>

        <router-link to="/admin/playlists">
            <li class="nav-item">
                <font-awesome-icon :icon="['fas', 'list']" /> Playlists
            </li>
        </router-link>
    </ul>
</nav>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faUser, faVideo, faComment, faList } from '@fortawesome/free-solid-svg-icons';

    library.add(faUser, faVideo, faComment, faList);
export default {
    name: 'AdminNav',
    components: {
        FontAwesomeIcon
    }
}
</script>

<style>
a {
    text-decoration: none;
}
nav {
    width: 100%;
    height: 100%;
    display: flex;
}
nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
}

nav ul li {
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #333;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
</style>
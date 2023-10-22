<template>
    <div class="sidemenu">
        <div class="logo">
            <img src="/logo/logo-no-background.png" alt="">
        </div>

        <div class="nav">
            <ul>
                <router-link to="/">
                    <li class="nav-item active">
                        <font-awesome-icon :icon="['fas', 'home']" /> Home
                    </li>
                </router-link>

                <router-link to="/upload">
                    <li class="nav-item">
                        <font-awesome-icon :icon="['fas', 'upload']" /> Upload Video
                    </li>
                </router-link>

                <router-link to="/channel">
                    <li class="nav-item">
                        <font-awesome-icon :icon="['fas', 'user']" /> Your Channel
                    </li>
                </router-link>

            </ul>
        </div>
        <div class="divider"></div>
        <div class="nav">
            <ul>
                <li class="nav-item">
                    <font-awesome-icon :icon="['fas', 'list']" /> Your Library
                </li>
                <!-- ... other items ... -->
            </ul>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faHome, faUpload, faUser, faList } from '@fortawesome/free-solid-svg-icons';

    library.add(faHome, faUpload, faUser, faList);
    
    export default {
        name: 'LefSidebar',
        components: {
            FontAwesomeIcon
        }
    }
</script>

<style scoped>
.sidemenu {
    background: #262626;
    height: 100vh;
    overflow-y: auto;
    padding: 0 !important;
}

.sidemenu .nav {
    margin-top: 20px;
    width: 100%;
    color: white;
    padding: 0 10px;
}

.sidemenu .nav a {
    color: white;
    text-decoration: none;
}

.sidemenu .nav ul, .sidemenu .nav li {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.sidemenu .nav .nav-item {
    margin-bottom: 0;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    transition: background 0.2s ease-in-out;
}

.sidemenu .nav .nav-item.muted {
    color: #bcbcbc;
    padding: 5px 20px;
    margin-bottom: 0;
}

.sidemenu .nav-item svg {
    margin-right: 10px;
}

.sidemenu .nav-item:hover, .sidemenu .nav-item.active {
    background: #4d4d4d;

}

.divider {
    border-bottom: 1px solid #4d4d4d;
    margin: 10px auto;
    width: 90%;
}
.sidemenu .logo {
    padding: 20px;
    text-align: center;
}

.sidemenu .logo img{
    width: 100%;
}
</style>
<template>
  <router-link :to="'/channel/' + data._id">
    <li class="nav-item subscriptions">
        <div class="logo">
            <img :src="'https://ui-avatars.com/api/?name='+data.username+'&background=random'" alt="">
        </div>
        {{ data.username }}
    </li>
  </router-link>
</template>

<script>
export default {
    name: 'SubscriptionsItem',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    created() {
        console.log(this.data)
    }
}
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}

ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.nav-item {
    margin-bottom: 0;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    transition: background 0.2s ease-in-out;
}

.nav-item.muted {
    color: #bcbcbc;
    padding: 5px 20px;
    margin-bottom: 0;
}

.nav-item.admin{
    color: rgb(189, 44, 44)
}

.nav-item svg {
    margin-right: 10px;
}

.nav-item:hover, .nav-item.active {
    background: #4d4d4d;
}

.nav-item.subscriptions, .nav-item.playlist {
    padding: 5px 5px;
    width: 100%;
    display: flex;
    font-size: 1.1em;
    align-items: center;
}

.nav-item.subscriptions .logo {
    padding: 0;
    width:40px;
    height: 40px;
    border-radius: 50px;
    overflow: hidden;
    margin-right: 10px;
}

.nav-item.subscriptions .logo img {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
}
</style>
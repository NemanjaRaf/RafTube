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
}
</script>

<style>

</style>
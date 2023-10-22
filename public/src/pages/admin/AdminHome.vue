<template>
    <page-template>
        <div class="card bg-light">
            <admin-nav />
        </div>
    </page-template>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue'
import PageTemplate from '../PageTemplate.vue'
export default {
  components: { PageTemplate, AdminNav },
    name: 'AdminHome',
}
</script>

<style>
</style>
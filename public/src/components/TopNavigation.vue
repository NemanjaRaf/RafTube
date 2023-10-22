<template>
  <div class="row topnav">
    <div class="col-5">
      <div class="form-group with-btn">
        <input type="text" class="form-control" placeholder="Search" />
        <div class="button center" type="button" id="button-addon2">
          <font-awesome-icon :icon="['fas', 'search']" />
        </div>
      </div>
    </div>

    <div class="col-1 ml-auto">
      <div class="profile dropdown" v-if="loggedIn">
        <img
          class="dropdown-toggle"
          :src="'https://ui-avatars.com/api/?name='+user.username+'&background=random'"
          alt=""
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);
export default {
    name: "TopNavigation",
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
          loggedIn: false,
          user: {}
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('setLoggedIn', false)
            this.$store.dispatch('setUser', {})
            this.$router.push('/login')
        }
    },
    created() {
      this.loggedIn = localStorage.getItem('token') ? true : false
      if (this.loggedIn) {
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    }
};
</script>

<style>
.topnav {
    margin-bottom: 20px;
}
.profile {
    height: 44px;
    width: 44px;
    float: right;
}

.profile img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50px;
}
</style>
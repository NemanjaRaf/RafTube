<template>
  <div class="row topnav">
    <div class="col-1 bars center" @click="openMenu">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </div>
    <div class="col-9 col-sm-9 col-md-9 col-lg-5 col-xl-5">
      <div class="form-group with-btn">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="query"
          @keyup.enter="search"
        />
        <div
          class="button center"
          type="button"
          id="button-addon2"
          @click="search"
        >
          <font-awesome-icon :icon="['fas', 'search']" />
        </div>
      </div>
    </div>

    <div class="col-1 ml-auto">
      <b-dropdown
        class="profile"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
        v-if="loggedIn"
      >
        <template #button-content>
          <img
            class="dropdown-toggle"
            :src="
              'https://ui-avatars.com/api/?name=' +
              user.username +
              '&background=random'
            "
            alt=""
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
        </template>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch,faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch,faBars);
export default {
  name: "TopNavigation",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      loggedIn: false,
      user: {},
      query: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    search() {
      this.$router.push("/search/" + this.query);
    },
    openMenu() {
      this.$emit("open");
    },
  },
  created() {
    this.loggedIn = localStorage.getItem("token") ? true : false;
    if (this.loggedIn) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
};
</script>

<style>
.topnav {
  margin-bottom: 20px;
}
.topnav .bars {
  font-size: 1.7em;
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

.dropdown .btn {
  padding: 0px 0px !important;
}
</style>
<template>
  <div>
    <div class="col-12 mt-4">
      <h6>Komentari</h6>

      <div class="comment-input d-flex mt-2" v-if="isLoggedIn()">
        <div class="logo">
          <img
            :src="'https://ui-avatars.com/api/?name='+user.username+'&background=random'"
            alt=""
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control w-100"
            placeholder="Add a public comment..."
            @keyup.enter="addComment"
            v-model="comment"
          />
        </div>
      </div>
    </div>

    <div class="comments">
      <single-comment v-for="c in comments" :key="c._id" :data="c" @edit="editComment" @delete="deleteComment"></single-comment>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SingleComment from "./SingleComment.vue";

export default {
  name: "CommentSection",
  components: { SingleComment },
  props: {
    video: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      comments: [],
      comment: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    addComment() {
      axios
        .post(this.API_URL + "/video/comment/" + this.video._id, {
          text: this.comment,
        }, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.comment = "";
          this.getComments();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getComments() {
      axios
        .get(this.API_URL + "/video/comment/" + this.video._id)
        .then((res) => {
          console.log(res.data);
          this.comments = res.data.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    editComment(id, text) {
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i]._id == id) {
          this.comments[i].text = text;
          break;
        }
      }

      axios.put(this.API_URL + "/video/comment/" + id, {
        text,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    },
    deleteComment(id) {
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i]._id == id) {
          this.comments.splice(i, 1);
          break;
        }
      }

      axios.delete(this.API_URL + "/video/comment/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    }
  },
  watch: {
    video() {
      this.getComments();
    },
  },
};
</script>

<style>
.comments .card {
    border: none;
}

.comment .text {
    padding: 0 10px;
    font-size: 0.9em;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.comment .logo {
    overflow: hidden;
    border-radius: 50px;
    height: 35px;
}

.comment .logo img {
    height: 100%;
}
.comment-input .logo {
    overflow: hidden;
    border-radius: 50px;
    height: 35px;
    display: inline-block;
    margin-right: 10px;
}
.comment-input .logo img {
    height: 100%;
}

.w-100 {
    width: 100%;
}
</style>
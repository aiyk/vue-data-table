<template>
  <div class="modal-wrap shadow">
    <div class="modal-header">
      <div class="modal-title">{{popup.modalTitle}}</div>
      <img v-on:click="popup.open = !popup.open" src="../assets/icon-set/times.svg">
    </div>

    <div class="modal-content">
      <form v-on:submit.prevent="createCollection(formData)">
        <text-input
          v-for="key in tblkeys"
          v-bind:key="key"
          v-bind:params="{
            name: key,
            placeholder: key,
            value: null,
            type: 'text',
            _return: inputVal
          }"
        />
        <button class="btn btn-blue">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Textinput from "./Textinput.vue";

export default {
  components: {
    "text-input": Textinput
  },
  props: ["tblkeys", "popup"],
  data() {
    return {
      formData: []
    };
  },
  methods: {
    inputVal: function(payload) {
      this.formData.push({ [payload.name]: payload.val });
    },
    ...mapMutations(["createCollection"])
  }
};
</script>

<style lang="scss" scoped>
.modal-wrap {
  width: 600px;
  min-height: 200px;
  background: #fff;
  box-sizing: border-box;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  background: #f8f8f8;
  padding: 10px 30px;
  box-sizing: border-box;
  img {
    cursor: pointer;
    padding: 5px;
    margin-left: 20px;
  }
}
.modal-content {
  padding: 20px 30px;
}
form {
  width: 100%;
}

@media only screen and (max-width: 650px) {
  .modal-wrap {
    width: 90%;
  }
}
</style>
<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">{{params.name}}</span>
    </div>
    <input
      v-bind:class="[{ isInvalid: params.error }, 'form-control', 'form-control-lg']"
      v-bind:placeholder="params.placeholder"
      v-bind:name="params.name"
      v-bind:value="params.value"
      v-bind:type="params.type"
      @blur="updateObj"
      v-model="payload.val"
    >
    <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      error: null,
      payload: {
        name: null,
        val: null
      }
    };
  },
  methods: {
    updateObj: function() {
      this.payload.name = this.params.name;
      if (this.payload.val) {
        this.error = null;
        this.params._return(this.payload);
      } else {
        this.error = `${this.params.name} is required`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
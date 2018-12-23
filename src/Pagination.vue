<template>
  <div class="tbl-pagination">
    <span>{{currentPage}} - {{perPage * multiplier}} of {{total}}</span>
    <img v-on:click="prev" src="./assets/icon-set/angle-left.svg">
    <img v-on:click="next" src="./assets/icon-set/angle-right.svg">
  </div>
</template>

<script>
export default {
  mounted() {
    this.currentPage = this.collection.currentPage;
    this.perPage = this.collection.perPage;
    this.total = this.collection.total;
  },
  props: ["collection"],
  data: function() {
    return {
      currentPage: null,
      perPage: null,
      total: null,
      multiplier: 1
    };
  },
  methods: {
    prev: function() {
      console.log("nnnnnnnnnnn", this.collection);
      this.currentPage -= this.perPage;
      this.multiplier -= 1;
      this.collection(null, this.currentPage, this.perPage);
    },
    next: function() {
      console.log("nnnnnnnnnnn", this.collection);
      this.currentPage += this.perPage;
      this.multiplier += 1;
      this.collection(null, this.currentPage, this.perPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.tbl-pagination {
  display: flex;
  color: var(--disabled);
  span {
    padding-left: 20px;
  }
  img {
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
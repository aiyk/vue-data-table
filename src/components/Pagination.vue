<template>
  <div class="tbl-pagination">
    <span>
      showing page {{pagination_data.currentPage}}
      out of {{collection.totalPages}} pages
    </span>
    <img v-on:click="prev" src="https://vue-data-table.firebaseapp.com/angle-left.svg">
    <img v-on:click="next" src="https://vue-data-table.firebaseapp.com/angle-right.svg">
  </div>
</template>

<script>
export default {
  props: ["collection", "pagination_data"],
  methods: {
    prev: function() {
      if (this.pagination_data.currentPage <= 1) {
        this.pagination_data.currentPage = 1;
      } else {
        this.pagination_data.currentPage -= 1;
      }
    },
    next: function() {
      if (this.pagination_data.currentPage >= this.collection.totalPages) {
        this.pagination_data.currentPage = this.collection.totalPages;
      } else {
        this.pagination_data.currentPage += 1;
      }
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
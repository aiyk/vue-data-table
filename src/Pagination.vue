<template>
  <div class="tbl-pagination">
    <span>
      {{pagination_data.currentPage}}
      - {{pagination_data.pageIncrement ? (pagination_data.pageIncrement) : (1)}}
      of {{pagination_data.totalPages}}
    </span>
    <img v-on:click="prev" src="./assets/icon-set/angle-left.svg">
    <img v-on:click="next" src="./assets/icon-set/angle-right.svg">
  </div>
</template>

<script>
export default {
  props: ["collection", "pagination_data"],
  methods: {
    prev: function() {
      if (
        this.pagination_data.currentPage <= 1 ||
        this.pagination_data.pageIncrement <= 5
      ) {
        this.pagination_data.currentPage = 1;
        this.pagination_data.perPage = 5;
      } else {
        this.pagination_data.currentPage -= this.pagination_data.perPage;
        this.pagination_data.multiplier -= 1;
        this.pagination_data.pageIncrement =
          this.pagination_data.multiplier * this.pagination_data.perPage;
      }
    },
    next: function() {
      if (
        this.pagination_data.currentPage >=
          this.pagination_data.totalPagesPages - 4 ||
        this.pagination_data.pageIncrement >= this.pagination_data.totalPages
      ) {
        this.pagination_data.currentPage = this.pagination_data.totalPages - 4;
        this.pagination_data.pageIncrement = this.pagination_data.totalPages;
      } else {
        this.pagination_data.currentPage += this.pagination_data.perPage;
        this.pagination_data.multiplier += 1;
        this.pagination_data.pageIncrement =
          this.pagination_data.multiplier * this.pagination_data.perPage;
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
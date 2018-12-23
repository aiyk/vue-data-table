<template>
  <div id="app">
    <!-- <data-table v-bind:tableData="tableData" v-bind:tableMeta="tableMeta"></data-table> -->
    <data-table
      v-bind:metaData="metaData"
      v-bind:collections="collections"
      v-bind:collections_keys="collections_keys"
    ></data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import Table from "./Table.vue";

export default {
  beforeCreate() {
    this.$store.dispatch("fetchCollections");
  },
  computed: mapGetters(["metaData", "collections", "collections_keys"]),
  components: {
    "data-table": Table
  },
  methods: {
    ...mapMutations(["editCollections"])
  }
};
</script>

<style lang="scss">
:root {
  /*Basic Colors*/
  --white: #ffffff;
  --success: #22ce8b;
  --success-lite: lighten(var(--success), 10%);
  --error: #f46363;
  --error-lite: rgba(245, 109, 109, 0.1);
  --warning: #ffcd54;
  /*Text Colors*/
  --text-primary: #040e28;
  --text-secondary: #646d82;
  --disabled: #a6b1c2;
  --shadow-color: rgba(148, 148, 148, 0.25);
  /*Background Greys*/
  --bg-grey-dark: #dce1ea;
  --bg-grey-medium: #e6eaf0;
  --bg-grey-light: #f0f2f7;
  --bg-grey-lighter: #f9fafc;
  --color-blue-lite: rgba(0, 110, 255, 0.1);
  --color-blue-liter: rgba(0, 110, 255, 0.02);
  --color-green-lite: rgba(34, 206, 139, 0.1);
  --color-orange-lite: rgba(255, 173, 48, 0.1);
  --main-bg-color: var(--bg-grey-light);
  /*Table Colors*/
  --table-row-hover: #d8e5f1;
  /*button colors*/
  --primary-button-color: #1f7fff;
  --primary-button-hover-state: #3fa9f5;
  --primary-button-pressed-state: #0071bc;
  --primary-button-lite: rgba(0, 99, 233, 0.1);
  --primary-button-lite-hover-state: rgba(0, 99, 233, 0.2);
  --primary-button-lite-pressed-state: rgba(0, 99, 233, 0.3);
  --hollow-button-border: #e9ecf2;
  --hollow-button-hover-bg: #fafafb;
  --green-button-hover-bg: #1ebd80;
  --green-button-pressed-bg: #19ac73;
  --green-button-lite: rgba(34, 206, 139, 0.1);
  --green-button-lite-hover: rgba(20, 201, 131, 0.2);
  --green-button-lite-pressed: rgba(20, 201, 131, 0.3);
  --red-button-hover: #dd5252;
  --red-button-pressed: #d64343;
  --red-button-lite: rgba(244, 99, 99, 0.3);
  --red-button-lite-hover: rgba(244, 99, 99, 0.4);
  --red-button-lite-pressed: rgba(244, 99, 99, 0.5);
  --input-disabled-bg: var(--bg-grey-lighter);
}

/*shadow rules*/
.shadow {
  -webkit-box-shadow: 0 8px 16px var(--shadow-color);
  -moz-box-shadow: 0 8px 16px var(--shadow-color);
  box-shadow: 0 8px 16px var(--shadow-color);
}

/*html element level style rules*/
html {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  outline: 0;
}

li {
  outline: 0;
}

#app {
  padding: 20px;
}
.btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  outline: 0;
  border: 0;
  img {
    padding-right: 10px;
  }
}
.btn-blue {
  background: var(--primary-button-color);
  color: #fff;
  &:active {
    background: var(--primary-button-pressed-state);
  }
  &:hover {
    background: var(--primary-button-hover-state);
  }
}
.btn-hollow {
  background-color: transparent;
  border: 0.1rem solid #fff;
  color: var(--text-primary);
  cursor: pointer;
  &:hover {
    border: 0.1rem solid #eee;
    background-color: #fff;
  }
  outline: 0;
}
.btn-x0 {
  width: 4rem;
  height: 3.5rem;
}
.btn-elipsis-v-center {
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("assets/icon-set/elipsis-v.svg");
}
/***** DROP DOWN MENU STYLE RULES *****/
.dropdown-wrap {
  position: relative;
}
.dropdown-wrap .dropdown-menu {
  display: block;
  position: absolute;
  width: max-content;
  right: 0;
  top: 2.3rem;
  z-index: 1;
  background-color: var(--white);
  padding: 0.3rem 0;
}
.dropdown-wrap .dropdown-menu li {
  cursor: pointer;
  padding: 0.3rem 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--bg-grey-light);
  min-height: 3rem;
}
.dropdown-wrap .dropdown-menu li:hover {
  background-color: var(--bg-grey-lighter);
}
.dropdown-wrap .dropdown-menu li img {
  margin-right: 1rem;
  display: inline;
}
.dropdown-wrap .dropdown-menu .ddmenu-active {
  color: var(--primary-button-color);
}

.clickable {
  cursor: pointer;
}
.search-wrap {
  display: flex;
  border-radius: 2px;
  border: 1px solid var(--bg-grey-dark);
  background-color: var(--bg-grey-lighter);
  width: 300px;
}
.search-wrap input {
  border: 0px;
  background-repeat: no-repeat;
  background-position: 0% 50%;
  background-image: url("assets/icon-set/search.svg");
  padding: 1rem 1rem 1rem 2rem;
  margin: 0 !important;
  width: 100%;
  outline: 0;
  background-color: var(--bg-grey-lighter);
  font-size: 1.4rem;
  color: var(--text-secondary);
}
.search-wrap select {
  outline: 0;
  border: 0px;
  background-color: var(--bg-grey-light);
  font-size: 1.4rem;
  color: var(--text-secondary);
  margin-right: 10px;
}
.search-wrap select > option {
  font-size: 1.6rem;
  color: var(--text-secondary);
  background: #f8f8f8;
  line-height: 2;
  outline: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

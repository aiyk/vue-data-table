<template>
  <div id="data-table" class="table-wrap">
    <div class="pre-table">
      <div class="table-titles">
        <div class="table-title">{{metaData.tblTitle}}</div>
        <div class="table-subtitle">{{metaData.tblSubtitle}}</div>
      </div>
      <div class="table-ctas">
        <button v-on:click="popup.open = !popup.open" class="btn btn-blue">
          <img src="./assets/icon-set/plus-white.svg"> Add New
        </button>
      </div>
    </div>

    <div class="tbl-controls">
      <div class="search-wrap">
        <select v-model="searchKey">
          <option v-for="key in collections_keys" v-bind:key="key">{{key}}</option>
        </select>
        <input v-model="search" type="search" placeholder="search...">
      </div>
      <pagination v-bind:collection="loadedCollection" v-bind:pagination_data="pagination_data"/>
    </div>

    <div class="tbl">
      <div>
        <div class="tr thead">
          <div v-if="metaData.trCheckbox" class="td-actions"></div>
          <div
            v-for="th in collections_keys"
            v-bind:key="th"
            v-on:click="sortCollections([th])"
            class="th"
          >
            <span>{{th}}</span>
            <img src="./assets/icon-set/filter.svg">
          </div>
          <div v-if="metaData.trActions" class="td-actions"></div>
        </div>
      </div>
      <div v-for="(item, index) in loadedCollection.data" v-bind:key="index">
        <div v-if="item != undefined && item != null" class="tr tbody">
          <div v-if="metaData.trCheckbox" class="td-actions">
            <input type="checkbox">
          </div>
          <div v-for="(val, key) in item" v-bind:key="key" class="td">
            <span v-show="!item_to_edit(index)">{{val}}</span>
            <input
              v-bind:value="val"
              v-show="item_to_edit(index)"
              @blur="updateCollections([$event, key, item.ID]), editTr_onclick('')"
              type="text"
              class="td-edit-input"
            >
          </div>
          <div v-if="metaData.trActions" class="td-actions dropdown-wrap">
            <button
              v-on:click="tblmenuitem_onclick(index)"
              class="btn-hollow btn-elipsis-v-center btn-x0"
            ></button>
            <div class="dropdown-wrap">
              <transition name="slide-fade">
                <ul
                  v-show="item_to_show(index)"
                  v-on:click="tblmenuitem_onclick('')"
                  class="dropdown-menu"
                >
                  <!-- <li>
                    <img src="./assets/icon-set/eye.svg"> View
                  </li>-->
                  <li v-on:click.stop="editTr_onclick(index), tblmenuitem_onclick('')">
                    <img src="./assets/icon-set/edit.svg"> Edit
                  </li>
                  <li v-on:click.stop="deleteCollection([item.ID]), tblmenuitem_onclick('')">
                    <img src="./assets/icon-set/trash-red.svg"> Delete
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tbl-controls">
      <pagination v-bind:collection="loadedCollection" v-bind:pagination_data="pagination_data"/>
      <div v-if="metaData.tblSummary" class="table-subtitle">{{metaData.tblSummary}}</div>
    </div>

    <transition name="fade">
      <div v-if="popup.open" class="modal-overlay">
        <modal v-bind:tblkeys="collections_keys" v-bind:popup="popup"/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Pagination from "./components/Pagination.vue";
import Modal from "./components/Modal.vue";

export default {
  mounted() {
    this.pagination_data.currentPage = this.loadedCollection.currentPage;
    this.pagination_data.perPage = this.loadedCollection.perPage;
    this.pagination_data.pageIncrement = this.loadedCollection.perPage;
    this.pagination_data.totalPages = this.collections.totalPages;
  },
  props: ["metaData", "collections", "collections_keys"],
  components: {
    pagination: Pagination,
    modal: Modal
  },
  data() {
    return {
      ddmenu_tblmenu: false,
      ddmenu_tblitem: false,
      clickItemIndex: null,
      editTrIndex: null,

      search: "",
      searchKey: "",
      thKeys: null,
      criteria: { search_key: "", search_val: "" },

      pagination_data: {
        currentPage: 1,
        perPage: 5,
        totalPages: 0
      },

      popup: {
        open: false,
        modalTitle: "New Data Entry"
      }
    };
  },
  methods: {
    item_to_show: function(i) {
      return this.clickItemIndex === i;
    },
    item_to_edit: function(i) {
      return this.editTrIndex === i;
    },
    tblmenu_onclick: function() {
      this.ddmenu_tblmenu = !this.ddmenu_tblmenu;
    },
    tblmenuitem_onclick: function(itemIndex) {
      if (this.clickItemIndex == itemIndex) {
        this.clickItemIndex = null;
      } else {
        this.clickItemIndex = itemIndex;
      }
      this.ddmenu_tblitem = !this.ddmenu_tblitem;
    },
    editTr_onclick: function(itemIndex) {
      if (this.editTrIndex == itemIndex) {
        this.editTrIndex = null;
      } else {
        this.editTrIndex = itemIndex;
      }
    },
    deleteTr_onclick: function(itemIndex) {
      collections.splice(itemIndex, 1);
    },
    paginate: function(collection, page, numItems) {
      if (!Array.isArray(collection)) {
        throw `Expect array and got ${typeof collection}`;
      }
      const currentPage = parseInt(page);
      const perPage = parseInt(numItems);
      const offset = (page - 1) * perPage;
      const paginatedItems = collection.slice(offset, offset + perPage);

      return {
        currentPage,
        perPage,
        total: collection.length,
        totalPages: Math.ceil(collection.length / perPage),
        data: paginatedItems
      };
    },
    ...mapMutations([
      "sortCollections",
      "updateCollections",
      "deleteCollection"
    ])
  },
  computed: {
    loadedCollection: function(fake, page, perPage) {
      this.criteria.search_key = this.searchKey;
      this.criteria.search_val = this.search;

      const getdata = this.$store.getters.filteredCollections(this.criteria);

      if (!this.pagination_data.currentPage) {
        this.pagination_data.currentPage = 1;
      }
      if (!this.pagination_data.perPage) {
        this.pagination_data.perPage = 5;
      }
      return this.paginate(
        getdata,
        this.pagination_data.currentPage,
        this.pagination_data.perPage
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  background: #fff;
  font-size: 1.6rem;

  .pre-table {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .table-titles {
      .table-title {
        font-size: 3rem;
        font-weight: bold;
        color: var(--text-secondary);
      }
    }
    .table-ctas {
      display: flex;
    }
  }
  .tr {
    display: grid;
    margin-bottom: 1rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-columns: 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: column;
    border-radius: 0.2rem;
    padding: 0.3rem 1rem;
  }
  .tbody {
    background: var(--color-blue-liter);
    border: 1px solid var(--color-blue-lite);
  }
  .th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    font-weight: normal;
    padding: 10px 15px;
    box-sizing: border-box;
    color: var(--text-secondary);
    grid-column: span 10;
    border-radius: 7px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &:hover {
      background-color: var(--bg-grey-lighter);
      border-bottom: 2px solid var(--color-blue-lite);
    }
  }

  .td {
    display: flex;
    align-items: center;
    vertical-align: center;
    text-align: left;
    min-height: 3.5rem;
    color: var(--text-primary);
    padding: 2px 15px;
    box-sizing: border-box;
    font-size: 1.3rem;
    grid-column: span 10;
  }
}
.td-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column: span 1;
}
.td-actions img {
  cursor: pointer;
}
.table-subtitle {
  font-size: 1.4rem;
  color: var(--disabled);
  font-style: italic;
}
.tbl-controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 5px 0;
}
.td-edit-input {
  padding: 8px;
  outline: 0px;
  border: 1px solid rgb(238, 238, 238);
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.02);
  top: 0;
  left: 0;
}

@media only screen and (max-width: 650px) {
  .table-wrap {
    .pre-table {
      flex-flow: column;
      align-items: center;
      .table-ctas {
        margin: 20px 0;
      }
    }
  }
  .tbl-controls {
    flex-flow: column;
    align-items: center;
    .tbl-pagination {
      margin: 20px 0;
    }
  }
  .thead {
    display: none !important;
  }
  .table-wrap .tr {
    display: block;
    -webkit-box-shadow: 0 4px 8px var(--shadow-color);
    -moz-box-shadow: 0 4px 8px var(--shadow-color);
    box-shadow: 0 4px 8px var(--shadow-color);
  }
  .table-wrap .pre-table {
    background: var(--bg-grey-lighter);
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>

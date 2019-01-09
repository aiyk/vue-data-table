<template>
  <div id="data-table" class="table-wrap">
    <div class="pre-table">
      <div class="table-titles">
        <div class="table-title">{{metaData.tblTitle}}</div>
        <div class="table-subtitle">{{metaData.tblSubtitle}}</div>
      </div>
      <div class="table-ctas">
        <!-- <button v-on:click="popup.open = !popup.open" class="btn btn-blue">
          <img src="https://vue-data-table.firebaseapp.com/plus-white.svg"> Add New
        </button>-->
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
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 1.5H0V0.5H14V1.5ZM12 6.5H2V5.5H12V6.5ZM4 11.5H10V10.5H4V11.5Z"
                fill="#646D82"
              ></path>
            </svg>
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
            <svg
              v-on:click="tblmenuitem_onclick(index)"
              class="btn-hollow btn-elipsis-v-center btn-x0"
              width="4"
              height="18"
              viewBox="0 0 4 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 2C4 2.39556 3.8827 2.78224 3.66294 3.11114C3.44318 3.44004 3.13082 3.69638 2.76537 3.84776C2.39992 3.99913 1.99778 4.03874 1.60982 3.96157C1.22186 3.8844 0.865492 3.69392 0.585787 3.41421C0.306082 3.13451 0.115601 2.77814 0.0384303 2.39018C-0.0387401 2.00222 0.000866562 1.60008 0.152242 1.23463C0.303617 0.869181 0.559962 0.556824 0.88886 0.337061C1.21776 0.117298 1.60444 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.960859 4 1.46957 4 2ZM4 9C4 9.39556 3.8827 9.78224 3.66294 10.1111C3.44318 10.44 3.13082 10.6964 2.76537 10.8478C2.39992 10.9991 1.99778 11.0387 1.60982 10.9616C1.22186 10.8844 0.865492 10.6939 0.585787 10.4142C0.306082 10.1345 0.115601 9.77814 0.0384303 9.39018C-0.0387401 9.00222 0.000866562 8.60008 0.152242 8.23463C0.303617 7.86918 0.559962 7.55682 0.88886 7.33706C1.21776 7.1173 1.60444 7 2 7C2.53043 7 3.03914 7.21071 3.41421 7.58579C3.78929 7.96086 4 8.46957 4 9ZM4 16C4 16.3956 3.8827 16.7822 3.66294 17.1111C3.44318 17.44 3.13082 17.6964 2.76537 17.8478C2.39992 17.9991 1.99778 18.0387 1.60982 17.9616C1.22186 17.8844 0.865492 17.6939 0.585787 17.4142C0.306082 17.1345 0.115601 16.7781 0.0384303 16.3902C-0.0387401 16.0022 0.000866562 15.6001 0.152242 15.2346C0.303617 14.8692 0.559962 14.5568 0.88886 14.3371C1.21776 14.1173 1.60444 14 2 14C2.53043 14 3.03914 14.2107 3.41421 14.5858C3.78929 14.9609 4 15.4696 4 16Z"
                fill="#646D82"
              ></path>
            </svg>
            <div class="dropdown-wrap">
              <transition name="slide-fade">
                <ul
                  v-show="item_to_show(index)"
                  v-on:click="tblmenuitem_onclick('')"
                  class="dropdown-menu"
                >
                  <!-- <li>
                    <img src="https://vue-data-table.firebaseapp.com/eye.svg"> View
                  </li>-->
                  <li v-on:click.stop="editTr_onclick(index), tblmenuitem_onclick('')">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.332 13H0.492C0.361513 13 0.236371 12.9482 0.144103 12.8559C0.0518356 12.7636 0 12.6385 0 12.508V10.668C0.0182671 10.3539 0.143146 10.0555 0.354 9.822L7.766 2.41L10.59 5.234L3.178 12.646C2.94469 12.8571 2.64615 12.9821 2.332 13ZM11.3 4.528L8.472 1.7L9.885 0.292C9.97659 0.199484 10.0856 0.126043 10.2058 0.075923C10.3259 0.0258027 10.4548 -2.2656e-06 10.585 1.49192e-10C10.7181 0.000329895 10.8498 0.0270096 10.9725 0.0784998C11.0952 0.12999 11.2065 0.205271 11.3 0.3L12.7 1.7C12.7949 1.79353 12.8703 1.90498 12.9218 2.0279C12.9733 2.15081 12.9999 2.28273 13 2.416C12.9999 2.54618 12.9741 2.67506 12.924 2.7952C12.8739 2.91534 12.8005 3.02437 12.708 3.116L11.3 4.527V4.528Z"
                        fill="#646D82"
                      ></path>
                    </svg>
                    Edit
                  </li>
                  <li v-on:click.stop="deleteCollection([item.ID]), tblmenuitem_onclick('')">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 3.75V2.25H6.75V3.75H2.25V5.25H15.75V3.75H11.25Z"
                        fill="#F46363"
                      ></path>
                      <path
                        d="M3.75 6.00006V15.0001C3.75 15.8273 4.42275 16.5001 5.25 16.5001H12.75C13.5773 16.5001 14.25 15.8273 14.25 15.0001V6.00006H3.75ZM8.25 13.5001H6.75V9.00006H8.25V13.5001ZM11.25 13.5001H9.75V9.00006H11.25V13.5001Z"
                        fill="#F46363"
                      ></path>
                    </svg> Delete
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
import "es6-promise/auto";
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
.td-actions svg {
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

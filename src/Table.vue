<template>
  <div id="data-table" class="table-wrap">
    <div class="pre-table">
      <div class="table-titles">
        <div class="table-title">{{metaData.tblTitle}}</div>
        <div class="table-subtitle">{{metaData.tblSubtitle}}</div>
      </div>
      <div class="table-ctas">
        <button class="btn btn-blue">
          <img src="./assets/icon-set/plus-white.svg"> Add New
        </button>
      </div>
    </div>

    <div class="tbl-controls">
      <div class="search-wrap">
        <select v-model="searchKey">
          <option v-for="(val, key) in tblData[0]" v-bind:key="key">{{key}}</option>
        </select>
        <input v-model="search" type="search" placeholder="search...">
      </div>
      <div class="tbl-pagination">
        <span>1 - 10 of 100</span>
        <img src="./assets/icon-set/angle-left.svg">
        <img src="./assets/icon-set/angle-right.svg">
      </div>
    </div>

    <div class="tbl">
      <div v-for="(item, index) in filteredTableData" v-bind:key="index">
        <div v-if="index===0" class="tr thead">
          <div v-if="metaData.trCheckbox" class="td-actions"></div>
          <div v-for="(val, key) in item" v-bind:key="key" class="th">
            <span>{{key}}</span>
            <img src="./assets/icon-set/filter.svg">
          </div>
          <div v-if="metaData.trActions" class="td-actions"></div>
        </div>
        <div class="tr tbody">
          <div v-if="metaData.trCheckbox" class="td-actions">
            <input type="checkbox">
          </div>
          <div v-for="(val, key) in item" v-bind:key="key" class="td">
            <span>{{val}}</span>
            <!-- <input v-bind:value="val" type="text"> -->
          </div>
          <div v-if="metaData.trActions" class="td-actions dropdown-wrap">
            <button
              v-on:click="tblmenuitem_onclick(index)"
              class="btn-hollow btn-elipsis-v-center btn-x0"
            ></button>
            <div class="dropdown-wrap">
              <ul
                v-show="item_to_show(index)"
                v-on:click="tblmenuitem_onclick('')"
                class="dropdown-menu"
              >
                <!-- <li>
                  <img src="./assets/icon-set/eye.svg"> View
                </li>-->
                <li>
                  <img src="./assets/icon-set/edit.svg"> Edit
                </li>
                <li>
                  <img src="./assets/icon-set/trash-red.svg"> Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tbl-controls">
      <div class="tbl-pagination">
        <span>1 - 10 of 100</span>
        <img src="./assets/icon-set/angle-left.svg">
        <img src="./assets/icon-set/angle-right.svg">
      </div>
      <div v-if="metaData.tblSummary" class="table-subtitle">{{metaData.tblSummary}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["metaData", "tblData"],
  data() {
    return {
      ddmenu_tblmenu: false,
      ddmenu_tblitem: false,
      clickItemIndex: null,
      search: "",
      searchKey: null,
      thKeys: null
    };
  },
  methods: {
    item_to_show: function(i) {
      return this.clickItemIndex === i;
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
    }
  },
  computed: {
    filteredTableData: function() {
      let criteria = [];
      criteria.push(this.searchKey);
      criteria.push(this.search);

      return this.$store.getters.filteredTblData(criteria);
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

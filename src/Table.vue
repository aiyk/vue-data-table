<template>
  <div id="data-table" class="table-wrap">
    <div class="pre-table">
      <div class="table-titles">
        <div class="table-title">{{dataTable.metaData.tblTitle}}</div>
        <div class="table-subtitle">{{dataTable.metaData.tblSubtitle}}</div>
      </div>
      <div class="table-ctas">
        <button class="btn btn-blue">
          <img src="./assets/icon-set/plus-white.svg"> Add New
        </button>
      </div>
    </div>

    <div class="tbl">
      <div v-for="(payment, index) in dataTable.paymentData" v-bind:key="index">
        <div v-if="index===0" class="tr">
          <div v-if="dataTable.metaData.trCheckbox" class="td-actions"></div>
          <div v-for="(val, key) in payment" v-bind:key="key" class="th">{{key}}</div>
          <div v-if="dataTable.metaData.trActions" class="td-actions"></div>
        </div>
        <div class="tr tbody">
          <div v-if="dataTable.metaData.trCheckbox" class="td-actions">
            <input type="checkbox">
          </div>
          <div v-for="(val, key) in payment" v-bind:key="key" class="td">{{val}}</div>
          <div v-if="dataTable.metaData.trActions" class="td-actions dropdown-wrap">
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
                <li>
                  <img src="./assets/icon-set/edit.svg"> Edit
                </li>
                <li>
                  <img src="./assets/icon-set/trash.svg"> Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dataTable.metaData.tblSummary"
      class="table-subtitle"
    >{{dataTable.metaData.tblSummary}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTable: {
        ddmenu_tblmenu: false,
        ddmenu_tblitem: false,
        clickItemIndex: null,

        metaData: {
          tblTitle: "BriteCore Payment Data",
          tblSubtitle:
            "Customer settement sheet for the month of October, 2018.",
          trActions: true,
          trCheckbox: true,
          tblSummary:
            "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
        },
        paymentData: [
          {
            id: "1",
            name: "Joana Linkin",
            description:
              "payment made for the purchase of an electrical wrapping sheet",
            date: "11th October, 2018",
            amount: 345.54
          },
          {
            id: "1",
            name: "Joana Linkin",
            description:
              "payment made for the purchase of an electrical wrapping sheet",
            date: "11th October, 2018",
            amount: 345.54
          },
          {
            id: "1",
            name: "Joana Linkin",
            description:
              "payment made for the purchase of an electrical wrapping sheet",
            date: "11th October, 2018",
            amount: 345.54
          }
        ]
      }
    };
  },
  methods: {
    item_to_show: function(i) {
      return this.dataTable.clickItemIndex === i;
    },
    tblmenu_onclick: function() {
      this.dataTable.ddmenu_tblmenu = !this.dataTable.ddmenu_tblmenu;
    },
    tblmenuitem_onclick: function(itemIndex) {
      if (this.dataTable.clickItemIndex == itemIndex) {
        this.dataTable.clickItemIndex = null;
      } else {
        this.dataTable.clickItemIndex = itemIndex;
      }
      this.dataTable.ddmenu_tblitem = !this.dataTable.ddmenu_tblitem;
    }
  }
};
</script>

<style lang="scss">
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
  .tbl {
    margin: 30px 0;
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
    background: transparent;
    font-weight: normal;
    padding: 2px 15px;
    box-sizing: border-box;
    color: var(--text-secondary);
    grid-column: span 10;
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
</style>

import firebase from '../../firebase/firebase'

const collections = firebase.database.ref('collections');

//initial state
const state = {
    metaData: {
        tblTitle: "BriteCore Payment Data",
        tblSubtitle: "Customer settement sheet for the month of October, 2018.",
        trActions: true,
        trCheckbox: false,
        tblSummary: "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
    },
    collections: [],
    sortState: true
}

export const getters = {
    metaData: state => {
        return state.metaData
    },
    collections: state => {
        return state.collections || [];
    },
    collections_keys: state => {
        let obj = Object.values(state.collections);
        return Object.keys(obj[0]) || [];
    },
    filteredCollections: state => criteria => {
        if (criteria.search_key) {
            const search_criteria = criteria.search_val.toLowerCase();

            return Object.values(state.collections).filter(item => {
                if (item[criteria.search_key]) {
                    const to_compare = item[criteria.search_key].toLowerCase();
                    return to_compare.includes(search_criteria)
                }
            });
        } else {
            return state.collections;
        }
    }
}

export const mutations = {
    sortCollections(state, sort_key) {
        state.sortState = !state.sortState;
        if (state.sortState) {
            state.collections.sort(function (a, b) {
                if (a[sort_key] < b[sort_key]) { return -1; }
                if (a[sort_key] > b[sort_key]) { return 1; }
                return 0;
            })
        } else {
            state.collections.sort(function (a, b) {
                if (a[sort_key] > b[sort_key]) { return -1; }
                if (a[sort_key] < b[sort_key]) { return 1; }
                return 0;
            })
        }
    },
    updateCollections(state, payload) {
        let dataBack = Object.values(state.collections).find(data => data.ID == payload[2]);
        const item_index = Object.values(dataBack).indexOf(dataBack[payload[1]]);
        const obj_index = Object.values(state.collections).findIndex(data => data.ID == payload[2]);
        const keyBack = Object.keys(dataBack);
        const req_payload = payload[0].srcElement.value;
        const req_header = keyBack[item_index];

        dataBack[req_header] = req_payload;
        collections.child(obj_index).update(dataBack, function () {
            console.log(obj_index);
        });
    },
    deleteCollection(state, payload) {
        const obj_index = Object.values(state.collections).findIndex(data => data.ID == payload);
        collections.child(obj_index).remove();
        console.log(obj_index);
        console.log(Object.keys(state.collections));
    },
    setCollections(state, payload) {
        state.collections = payload;
    }
}

export const actions = {
    fetchCollections({ commit }) {
        firebase.database.ref('collections').on('value', snapshot => {
            commit('setCollections', snapshot.val())
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
};
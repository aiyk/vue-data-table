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
    collections: []
}

export const getters = {
    metaData: state => {
        return state.metaData
    },
    collections: state => {
        return state.collections || [];
    },
    filteredCollections: state => criteria => {
        if (criteria.search_key) {
            const search_criteria = criteria.search_val.toLowerCase();

            return Object.values(state.collections).filter(item => {
                if (item[criteria.search_key]) {
                    const to_compare = item[criteria.search_key].toLowerCase();
                    console.log('***COMPARE**** =>', to_compare, '****BY****', search_criteria);
                    console.log(to_compare.includes(search_criteria));
                    return to_compare.includes(search_criteria)
                }
            });
        } else {
            return state.collections;
        }
    }
}

export const mutations = {
    editCollections(state, payload) {
        let dataBack = state.collections.find(data => data.ID === payload[2]);
        //dataBack[payload[1]] = payload[0].srcElement.value;
        collections.child(dataBack[payload[1]]).set(payload[0].srcElement.value);
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
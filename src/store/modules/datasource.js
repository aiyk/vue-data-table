import firebase from '../../firebase/firebase'
import { mapGetters } from 'vuex'

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
        return state.collections.filter(item => {
            if (criteria[0]) {
                return item[criteria[0]].toLowerCase().includes(criteria[1].toLowerCase());
            } else {
                return item;
            }
        });
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
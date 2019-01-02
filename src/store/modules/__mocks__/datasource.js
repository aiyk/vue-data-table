import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
    metaData: {
        tblTitle: "BriteCore Payment Data",
        tblSubtitle: "Customer settement sheet for the month of October, 2018.",
        trActions: true,
        trCheckbox: false,
        tblSummary: "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
    },
    collections: [
        {
            id: 1,
            name: 'Foo',
            status: 0,
        },
        {
            id: 1,
            name: 'Bar',
            status: 0,
        }
    ],
    sortState: true
};

export const getters = {
    metaData: jest.fn().mockReturnValue(
        {
            tblTitle: "BriteCore Payment Data",
            tblSubtitle: "Customer settement sheet for the month of October, 2018.",
            trActions: true,
            trCheckbox: false,
            tblSummary: "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
        }
    ),
    collections: jest.fn().mockReturnValue([
        {
            id: 1,
            name: 'Foo',
            status: 0,
        },
        {
            id: 1,
            name: 'Bar',
            status: 0,
        },
    ]),
    filteredCollections: jest.fn().mockReturnValue([
        {
            id: 1,
            name: 'Foo',
            status: 0,
        },
        {
            id: 1,
            name: 'Bar',
            status: 0,
        },
    ]),
    collections_keys: jest.fn().mockReturnValue(["id", "name", "status"]),
};

export const mutations = {
    sortCollections: jest.fn(),
    createCollection: jest.fn(),
    updateCollections: jest.fn(),
    deleteCollection: jest.fn(),
    setCollections: jest.fn(),
    populateCollections: jest.fn(),
};

export const actions = {
    fetchCollections: jest.fn(),
};

export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
    const mockGetters = Object.assign({}, getters, custom.getters);
    const mockMutations = Object.assign({}, mutations, custom.mutations);
    const mockActions = Object.assign({}, actions, custom.actions);
    const mockState = Object.assign({}, state, custom.state);

    return {
        getters: mockGetters,
        mutations: mockMutations,
        actions: mockActions,
        state: mockState,
        store: new Vuex.Store({
            getters: mockGetters,
            mutations: mockMutations,
            actions: mockActions,
            state: mockState,
        }),
    };
}

export const store = __createMocks().store;
import { mutations, getters } from './datasource';

var expect = require('chai').expect;
var request = require('request');

const {
    sortCollections,
    createCollection,
    updateCollections,
    deleteCollection
} = mutations;

const {
    metaData,
    collections,
    collections_keys,
    filteredCollections
} = getters;

describe('mutations => sortCollections', () => {
    it('should sort the state collections array in both ascending and decending order (toggle ASC DSC)', () => {
        // mock state
        const state = {
            collections: [{ ID: '1' }, { ID: '2' }
            ],
            sortState: true
        };

        //mock payload
        const sort_key = 'ID';

        // apply mutation
        sortCollections(state, sort_key);
        // assert result
        if (state.sortState) {
            expect(state.collections).to.eql(
                [{ ID: '1' }, { ID: '2' }]
            );
        } else {
            expect(state.collections).to.eql(
                [{ ID: '2' }, { ID: '1' }]
            );
        }
    })
})

describe('mutations => createCollection', () => {
    it('should add a new entry to the state collections array', () => {
        // mock state
        const state = {
            collections: [{ ID: '1' }, { ID: '2' }]
        };

        //mock payload
        const payload = { ID: '3' };

        // apply mutation
        createCollection(state, payload, test = true);
        // assert result
        expect(state.collections).to.eql(
            [{ ID: '1' }, { ID: '2' }, { ID: '3' }]
        );
    })
})

describe('mutations => updateCollections', () => {
    it('should update table data', () => {
        // mock state
        const state = {
            collections: [{ ID: '1', Name: 'Aiyk' }]
        };

        //mock payload
        const payload = [{ srcElement: { value: 'Aiyk Ekwe' } }, 'Name', '1'];

        // apply mutation
        updateCollections(state, payload, test = true);
        // assert result
        expect(state.collections).to.eql(
            [{ ID: '1', Name: 'Aiyk Ekwe' }]
        );
    })
})

describe('mutaions => deleteCollection', () => {
    it('should delete table data', () => {
        // mock state
        const state = {
            collections: [{ ID: '1', Name: 'Aiyk' }, { ID: '2', Name: 'Ekwe' }]
        };

        //mock payload
        const payload = '2';

        // apply mutation
        deleteCollection(state, payload, test = true);
        // assert result
        expect(state.collections).to.eql(
            [{ ID: '1', Name: 'Aiyk' }]
        );
    })
})

describe('getters => metaData', () => {
    it('should return table meta data', () => {
        // mock state
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

        // apply mutation
        const metadata = metaData(state);
        // assert result
        expect(state.metaData).to.eql(metadata);
    })
})

describe('getters => collections', () => {
    it('should return table collections', () => {
        // mock state
        const state = {
            metaData: {},
            collections: [{ ID: '1', Name: 'Aiyk' }, { ID: '2', Name: 'Ekwe' }]
        }

        // apply mutation
        const collection = collections(state);
        // assert result
        expect(state.collections).to.eql(collection);
    })
})

describe('getters => collections_keys', () => {
    it('should return table headers', () => {
        // mock state
        const state = {
            metaData: {},
            collections: [{ ID: '1', Name: 'Aiyk' }, { ID: '2', Name: 'Ekwe' }]
        }

        // apply mutation
        const keys = collections_keys(state);
        // assert result
        expect(keys).to.eql(['ID', 'Name']);
    })
})

describe('getters => filteredCollections', () => {
    it('should return a filtered data set based on the supplied criteria', () => {
        // mock state
        const state = {
            metaData: {},
            collections: [{ ID: '1', Name: 'Aiyk' }, { ID: '2', Name: 'Ekwe' }]
        }

        //mock criteria
        const criteria = {
            search_key: 'ID',
            search_val: '1'
        }
        // apply mutation
        const result = filteredCollections(state)(criteria);
        // assert result
        expect(result).to.eql([{ ID: '1', Name: 'Aiyk' }]);
    })
})
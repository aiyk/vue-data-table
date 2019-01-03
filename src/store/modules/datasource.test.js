import { mutations } from './datasource';

var expect = require('chai').expect;
var request = require('request');

const {
    sortCollections,
    createCollection,
    updateCollections,
    deleteCollection
} = mutations;

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
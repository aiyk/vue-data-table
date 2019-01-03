import { mutations } from './datasource';

var expect = require('chai').expect;
var request = require('request');

const { sortCollections } = mutations;

describe('mutations', () => {
    it('should update the edited table row or specifically table data', () => {
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
import { mutations } from './store/modules/datasource';

var expect = require('chai').expect;
var request = require('request');

const { editTblData } = mutations;

describe('mutations', () => {
    it('should update the edited table row or specifically table data', () => {
        // mock state
        const state = {
            tblData: [
                {
                    ID: "1",
                    Name: "abc",
                    Description: "efg",
                    Date: "2017-07-23T04:24:49-07:00",
                    Amount: 1
                }
            ]
        };

        //mock payload
        payload = [{ 'srcElement': 'Aiyk' }, 'Name', '1'];

        // apply mutation
        editTblData(state, payload);
        // assert result
        expect(state.tblData.Name).to.equal('Aiyk');
    })
})
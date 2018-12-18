import { getters } from '../src/store/modules/datasource'

const deepCopy = object => JSON.parse(JSON.stringify(object));

initialState = {
    tblData: [
        {
            ID: "1",
            Name: "abc",
            Description: "efg",
            Date: "2017-07-23T04:24:49-07:00",
            Amount: 1
        }
    ]
}

xdescribe("getters", () => {
    it("should filter the table data based on passed criteria", () => {
        const state = deepCopy(initialState);
        const criteria = ["Name", "abc"];
        const result = getters.filteredTblData(state)(criteria);

        expect(result).to.deep.equal(initialState.tblData);
    });

    it("should return an empty list for a non-existent collection", () => {
        const state = deepCopy(initialState);
        const criteria = ["Name", "abcde"];
        const result = getters.filteredTblData(state)(criteria);

        expect(result).to.not.be.undefined;
        expect(result).to.be.an('array').that.is.empty;
    })
});

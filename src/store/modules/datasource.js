import { mapGetters } from 'vuex'

//initial state
const state = {
    metaData: {
        tblTitle: "BriteCore Payment Data",
        tblSubtitle: "Customer settement sheet for the month of October, 2018.",
        trActions: true,
        trCheckbox: false,
        tblSummary: "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
    },
    tblData: [
        {
            ID: "3471DA17-401F-9633-BF81-4CADA6FD5C79",
            Name: "Kyra Lester",
            Description: "Curabitur dictum. Phasellus in",
            Date: "2017-07-23T04:24:49-07:00",
            Amount: 345.54
        },
        {
            ID: "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
            Name: "Buckminster Alvarado",
            Description: "dui, in sodales elit erat vitae risus. Duis a mi",
            Date: "2018-11-08T05:44:15-08:00",
            Amount: 677.08
        },
        {
            ID: "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
            Name: "Athena Smith",
            Description: "massa lobortis ultrices. Vivamus rhoncus.",
            Date: "2018-11-11T06:19:57-08:00",
            Amount: 73.67
        },
        {
            ID: "74749D4F-A43F-34E8-A687-D54924B17251",
            Name: "Cameron Thompson",
            Description: "dolor. Fusce mi lorem, vehicula et, rutrum eu,",
            Date: "2019-09-30T06:56:15-07:00",
            Amount: 807.6
        },
        {
            ID: "DB983FEF-AF70-7D2E-86BA-0C2AE749E729",
            Name: "Dawn Alford",
            Description: "Pellentesque ut ipsum",
            Date: "2019-03-06T13:24:31-08:00",
            Amount: 820.96
        },
        {
            ID: "8E6F38E1-5DC7-5030-4513-8FBB237EF5DB",
            Name: "Barclay Sears",
            Description: "sit amet ultricies sem magna",
            Date: "2019-10-28T04:57:29-07:00",
            Amount: 116.36
        },
        {
            ID: "4891AA6C-02DF-A955-951C-9CEEC6D69387",
            Name: "James Melton",
            Description: "non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis",
            Date: "2019-03-13T09:43:05-07:00",
            Amount: 956.72
        },
        {
            ID: "7BF06B3D-5DF2-9EEA-9E32-1BB284D0ABB9",
            Name: "Medge Powell",
            Description: "elit sed",
            Date: "2018-01-19T20:33:11-08:00",
            Amount: 726.37
        },
        {
            ID: "5DEB3210-1591-B14D-1D51-389F84099E84",
            Name: "Lucas Ray",
            Description: "morbi tristique senectus",
            Date: "2017-06-19T14:05:17-07:00",
            Amount: -439.33
        },
        {
            ID: "17019E51-E9B9-2E41-ECA4-3691F74BABA1",
            Name: "Denise Walsh",
            Description: "Mauris",
            Date: "2017-07-18T08:53:37-07:00",
            Amount: 946.99
        }
    ]
}

export const getters = {
    metaData: state => {
        return state.metaData
    },
    tblData: state => {
        return state.tblData
    },
    filteredTblData: state => criteria => {
        return state.tblData.filter(item => {
            if (criteria[0]) {
                return item[criteria[0]].includes(criteria[1]);
            } else {
                return item;
            }
        });
    }
}

export default {
    state,
    getters
};
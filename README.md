# Vue Data Table

### Introduction
> Vue Data Table is built with one primary goal in mind, REUSABILITY. the basic purpose of this project is to supply its user a holistic data table which ships with every table feature right out of the box.
Whilst ensuring that this project is complex enough to carter for every table or data management related need right out the box, we also put in concious effort to ship a product which is extremely easy to setup and or configure.

### Documentation

#### Installation
To setup this project on your local mechine;

run `git clone https://github.com/aiyk/vue-data-table.git` to clone the repository unto your mechine

`cd vue-data-table`

`npm install`

finally run the command `npm run dev` to serve the application. Once served, the application loads up with some dummy data loaded from a firebase database, this gives you a basic idea of what to expect.

#### Setting up your data source
In other to reuse for your specific needs, all you need do is to point the table to your data source or even better, your vuex store. This can be done by passing any javascript object or json type data into the table via props.

```javascript
metaData: {
    tblTitle: "BriteCore Payment Data",
    tblSubtitle: "Customer settement sheet for the month of October, 2018.",
    trActions: true,
    trCheckbox: false,
    tblSummary: "the table is a brief breakdown of all the accumulated wealth of britecore's clientale"
}
```

```javascript
collections[
    {
      "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "Name": "Kyra Lester",
      "Description": "Curabitur dictum. Phasellus in",
      "Date": "2017-07-23T04:24:49-07:00",
      "Amount": 345.54
    },
    {
      "ID": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
      "Name": "Buckminster Alvarado",
      "Description": "dui, in sodales elit erat vitae risus. Duis a mi",
      "Date": "2018-11-08T05:44:15-08:00",
      "Amount": 677.08
    },
    {
      "ID": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
      "Name": "Athena Smith",
      "Description": "massa lobortis ultrices. Vivamus rhoncus.",
      "Date": "2018-11-11T06:19:57-08:00",
      "Amount": 73.67
    },
    {
      "ID": "74749D4F-A43F-34E8-A687-D54924B17251",
      "Name": "Cameron Thompson",
      "Description": "dolor. Fusce mi lorem, vehicula et, rutrum eu,",
      "Date": "2019-09-30T06:56:15-07:00",
      "Amount": 807.6
    }
]
```

```javascript
<data-table
    v-bind:metaData="metaData"
    v-bind:collections="collections"
    v-bind:collections_keys="collections_keys"
></data-table>
```

Kindly note that the `collections_keys` prop is derived from the keys in your dataset

```javascript
collections_keys: state => {
    if (state.collections) {
        let obj = state.collections;
        for (var prop in obj) {
            return Object.keys(obj[prop]);
        }
    }
}
```

### Notes

#### For how long I worked on this component?
Its really hard to measure since i worked along side this project three others all within the same season, but a rough estimate of say two weeks should do.

#### What I would do differently if i had more time?
Alot actually, but for starters, I would build a proper rest API with Node js and not have to use firebase so as to be sure to simulate what a real life situation would look like.

#### How I can Adapt my component for greater reusability?
* [x] Deploy the component as an NPM package for ease of use as a dependency
* [x] ensure that the table row action set is dynamically loaded and configurable
* [x] bake into the component more filtering options based on the loaded data set
* [x] add configuration meta data to every table data. this is so as to give the user the ability to set what actions can be carried out on each table data. A good example for this is how the user story clearly specified that the Admin should be able to edit payment details but said nothing about the others.
* [x] improve on my unit test's coverage, especially component based tests
* [x] include customizable theming so table can easily blend in

#### My favorite css property?
its definately css grid, reason being that with little effort, it gives an unlimited wealth of control with regards to positioning stuff. By the way, this component works mostly because of a few lines of css grid based style rules

#### My favorite modern javascript feature?
my favorite modern javascript feature will be the currying of unary functions which i refer to as the double arrowed function. 
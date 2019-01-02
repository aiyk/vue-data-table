import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import { __createMocks as createStoreMocks } from '../store';

import App from './App';

// Tell Jest to use the mock
// implementation of the store.
jest.mock('./store/modules');

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ShoppingList', () => {
    let storeMocks;
    let wrapper;

    beforeEach(() => {
        // Create a fresh store and wrapper
        // instance for every test case.
        storeMocks = createStoreMocks();
        wrapper = shallow(ShoppingList, {
            store: storeMocks.store,
            localVue,
        });
    });

    test('It should fetch items.', () => {
        expect(storeMocks.actions.fetchCollections).toBeCalled();
    });
});
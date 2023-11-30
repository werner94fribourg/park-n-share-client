/**
 * Navbar slice of the redux store
 * @module store
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef NavbarInitialState
 * @property {boolean} isOpen the navbar opening status in the page
 *
 * The initial state for the navbar store
 * @type {NavbarInitialState}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const initialState = { isOpen: false };

/**
 * The slice of the store representing the navbar state
 * @type {import('@reduxjs/toolkit').Slice<NavbarInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setOpenState(state) {
      state.isOpen = !state.isOpen;
    },
    setClosedState(state) {
      state.isOpen = false;
    },
  },
});

/**
 * The actions associated with the navbar state
 * @type {import('@reduxjs/toolkit').CaseReducerActions<NavbarInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const navbarActions = navbarSlice.actions;

/**
 * The reducer associated with the navbar state
 * @type {import('@reduxjs/toolkit').Reducer<NavbarInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const navbarReducer = navbarSlice.reducer;

export default navbarReducer;

/**
 * Function used to open the navigation bar when we are in mobile mode.
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const openNavbar = dispatch => {
  dispatch(navbarActions.setOpenState());
};

/**
 * Function used to close the navigation bar when we are in mobile mode.
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const closeNavbar = dispatch => {
  dispatch(navbarActions.setClosedState());
};

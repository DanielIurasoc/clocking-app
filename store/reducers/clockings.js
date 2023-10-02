import ENTRIES from '../../data/dummy-data.js';

const initialState = {
  allClockings: ENTRIES,
  userClockings: ENTRIES.filter((entry) => entry.ownerId === 'u001'),

  // to add filters
};

export default function clockingsReducer(state = initialState, action) {
  return state;
}

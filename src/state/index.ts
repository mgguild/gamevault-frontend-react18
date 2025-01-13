import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
// import farmsReducer from './farms'
// import poolsReducer from './pools'
// import predictionsReducer from './predictions'
// import profileReducer from './profile'
import teamsReducer from './teams'
// import achievementsReducer from './achievements'
// import guildpadReduer from './launchpad'
// import guildpadReducer from './guildpads'
// import blockReducer from './block'
// import collectiblesReducer from './collectibles'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    // achievements: achievementsReducer,
    // guildpads: guildpadReducer,
    // block: blockReducer,
    // farms: farmsReducer,
    // pools: poolsReducer,
    // predictions: predictionsReducer,
    // profile: profileReducer,
    teams: teamsReducer,
    // collectibles: collectiblesReducer,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

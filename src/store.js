import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { playListEpics } from "./modules/playlists/actions";
import playListReducers from "./modules/playlists/reducers";

const rootEpic = combineEpics(...Object.values(playListEpics));
const epicMiddleware = createEpicMiddleware();
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export const rootReducer = combineReducers({
  playList: playListReducers
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(rootEpic);

export default store;

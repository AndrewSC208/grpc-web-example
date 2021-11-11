import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';

import createRootReducer from './reducers';

// setup history api
export const history = createBrowserHistory();

// sets up the store
export default function configureStore(preloadedState) {
    // STORY 1 -> SPIKE: review redux setup, it's been a while
    // STORY 1 -> if dev mode then add in dev tools
    // TODO -> add enhancers
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            ),
        ),
    )

    return store
}

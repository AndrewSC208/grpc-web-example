import cuid from 'cuid';
import {Counter, Blank} from "counter_rpc_service";
import {CounterService} from "../services/rpc";

//////////////////
// ACTION CREATORS
//////////////////

// Create
export const Create = () => {
    return dispatch => {
        // update state so that so that the ui knows a network request has started
        dispatch({type: CREATE_COUNTER_REQUEST});
        
        // create the payload
        let payload = { id: cuid(), name: "Counter Name", count: 0 }

        // update state with the new payload
        dispatch({ type: CREATE_COUNTER, payload });

        // construct the pb request
        let req = new Counter();

        // map each item in the payload to the pb object
        req.setId(payload.id)
        req.setName(payload.name)
        req.setCount(payload.count)
        
        // Call the CounterService.Create method with the newly constructed pb object
        CounterService.create(req, {}, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                dispatch({ type: CREATE_COUNTER_RESPONSE });
            }
        });
    }
}

// Read
export const Read = () => {
    return dispatch => {
        dispatch({ type: READ_COUNTER_REQUEST });
        
        let req = new Blank();

        dispatch({ type: READ_COUNTER, req })

        CounterService.read(req, {}, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                // convert array of counter objects to an object of objects
                // todo -> I might be able to optimize this action so it's actually not needed
                // I think that if I return a map<string(id), counter> then when I call .toObject()
                // on the response then it will be in the formate that is expected. 
                // I need to validate this, it will require me to regenerate the pb tho.
                let payload = res.toObject().countersList.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

                dispatch({ type: READ_COUNTER_RESPONSE, payload})
            }
        });
    }
}

// Update
export const Update = (payload) => {
    return dispatch => {
        dispatch({ type: UPDATE_COUNTER_REQUEST})
        // update the store
        dispatch({ type: UPDATE_COUNTER, payload})
        
        // construct the pb request
        let req = new Counter();

        // map each item in the payload to the pb object
        req.setId(payload.id)
        req.setName(payload.name)
        req.setCount(payload.count)

        // send network request
        CounterService.update(req, {}, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                dispatch({ type: UPDATE_COUNTER_RESPONSE })
            }
        });
    }
}

// Delete
export const Delete = (payload) => {
    return dispatch => {
        dispatch({ type: DELETE_COUNTER_REQUEST })
        dispatch({ type: DELETE_COUNTER, payload})

        let req = new Counter();

        req.setId(payload.id)

        CounterService.delete(req, {}, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                dispatch({ type: DELETE_COUNTER_RESPONSE })
            }
        });        
    }
}

//////////////////
// COUNTER REDUCER
//////////////////
// todo -> update reducer to react to all CRUD action types
export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COUNTER_REQUEST:
        case READ_COUNTER_REQUEST:
        case UPDATE_COUNTER_REQUEST:
        case DELETE_COUNTER_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case CREATE_COUNTER:
        case UPDATE_COUNTER:
            return {
                ...state,
                collection: {
                    ...state.collection, 
                    [action.payload.id]:{...action.payload}
                },
            }

        // TODO -> Store the read request in meta data section of the store
        case READ_COUNTER:
            return {
                ...state
            }

        case DELETE_COUNTER:
            const collection = Object.keys(state.collection)
                .filter(key => key !== action.payload.id)
                .reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: state.collection[key]
                    };
                }, {});

            return {
                ...state, 
                collection
            };

        case CREATE_COUNTER_RESPONSE:
        case UPDATE_COUNTER_RESPONSE:
        case DELETE_COUNTER_RESPONSE:
            return {
                ...state,
                isLoading: !state.isLoading,
            }

        case READ_COUNTER_RESPONSE:
            return {
                ...state,
                isLoading: !state.isLoading,
                collection: {
                    ...state.collection,
                    ...action.payload
                }
            }

        default:
            return state
    }
}

///////////////
// ACTION TYPES
///////////////
export const CREATE_COUNTER_REQUEST = 'counter/CREATE_REQUEST'
export const CREATE_COUNTER = 'counter/CREATE'
export const CREATE_COUNTER_RESPONSE = 'counter/CREATE_RESPONSE'

export const READ_COUNTER_REQUEST = 'counter/READ_REQUEST'
export const READ_COUNTER = 'counter/READ'
export const READ_COUNTER_RESPONSE = 'counter/READ_RESPONSE'

export const UPDATE_COUNTER_REQUEST = 'counter/UPDATE_REQUEST'
export const UPDATE_COUNTER = 'counter/UPDATE'
export const UPDATE_COUNTER_RESPONSE = 'counter/UPDATE_RESPONSE'

export const DELETE_COUNTER_REQUEST = 'counter/DELETE_REQUEST'
export const DELETE_COUNTER = 'counter/DELETE'
export const DELETE_COUNTER_RESPONSE = 'counter/DELETE_RESPONSE'

////////////////
// INITIAL STATE
////////////////
// TODO -> add some 
const initialState = {
    isLoading: false,
    collection: {}
}


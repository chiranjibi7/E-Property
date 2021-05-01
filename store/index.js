import {combineReducers} from "redux";
import {authenticateReducer} from './reducer/auth';
import {getProfileReducer} from './reducer/profile';
import {propertyReducer} from './reducer/property';

export const rootReducer=combineReducers({
    authenticate: authenticateReducer,
    profile: getProfileReducer,
    property: propertyReducer   
});
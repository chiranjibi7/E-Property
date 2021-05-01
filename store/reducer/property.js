import {GET_PROPERTY} from '../action/property';

const initialState={
    properties :[]
}

export const propertyReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_PROPERTY:
            return{
                ...state,
                properties: [...action.allProperties]
            }
    }
    return state;
};
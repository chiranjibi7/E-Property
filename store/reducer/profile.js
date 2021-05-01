import {GET_PROFILE} from '../action/profile';

const initialState={
    userProfile:{}
};

export const getProfileReducer=(state=initialState, action)=>{
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }

    }
    return state;
}
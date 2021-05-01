import {LOG_IN,SIGN_UP, LOGGED_IN, LOG_OUT} from "../action/auth";

const initialState={
    loginAuth:{
        token:null,
        userId: null,
        email:null
    },
    signupAuth:{
        token:null,
        userId: null
    },
    isLoggedIn: false
};

export const authenticateReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOG_IN:
            return{
                ...state,
               loginAuth:{
                   token: action.token,
                   userId: action.userId,
                   email: action.email
               }
            }

        case SIGN_UP:
            return{
                ...state,
                signupAuth:{
                    token: action.token,
                    userId: action.userId
                }
            }

        case LOGGED_IN:
            return{
                ...state,
                isLoggedIn: true
            }

        case LOG_OUT:
            return {
                ...initialState,
                isLoggedIn: true
            }
    }
    return state;
};


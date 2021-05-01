import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOG_IN='LOG_IN';
export const SIGN_UP='SIGN_UP';
export const LOG_OUT='LOG_OUT';

export const LOGGED_IN=' LOGGED_IN';

const API_KEY='AIzaSyDRwOIwR4aYJAuijubs_JD5OW5cA_CFp4g';
const BASE_URL='https://identitytoolkit.googleapis.com';

export const signup=(email,password)=>{
     return async dispatch=>{
        const response= await fetch(`${BASE_URL}/v1/accounts:signUp?key=${API_KEY}`,
       {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        })
       });
       if(!response.ok){
           const errResData= await response.json();
           let errorMessage='Something went wrong!';
           if(errResData.error.message==='EMAIL_EXISTS'){
               errorMessage='Email already exists!'
           }
           throw new Error(errorMessage);
       }
       const resData= await response.json();
       dispatch({type: SIGN_UP, token: resData.idToken, userId: resData.localId});
       const expirationDate= new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
       saveDataToStorage(resData.idToken, resData.localId, expirationDate);
}
}

export const login=(email,password)=>{
     return async dispatch=>{
      
       const response= await fetch(`${BASE_URL}/v1/accounts:signInWithPassword?key=${API_KEY}`,
       {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
            
        })
       });
       if(!response.ok){
           const errResData= await response.json();
           let errorMessage='Something went wrong!';
           if(errResData.error.message==='EMAIL_NOT_FOUND'){
               errorMessage='Email not found'
           } else if(errResData.error.message==='INVALID_PASSWORD'){
               errorMessage='Invalid Password'
           } 
           throw new Error(errorMessage);
       }
       const resData= await response.json();
       dispatch({type: LOG_IN, token: resData.idToken, userId: resData.localId, email: resData.email});
       const expirationDate= new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
       saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }  
};
export const passwordReset=(email)=>{
     return async dispatch=>{
      
       const response= await fetch(`${BASE_URL}/v1/accounts:sendOobCode?key=${API_KEY}`, 
       {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email:email, 
            requestType: 'PASSWORD_RESET'
        })
       });
       if(!response.ok){
           const errResData= await response.json();
           let errorMessage='Something went wrong!';
           if(errResData.error.message==='EMAIL_NOT_FOUND'){
               errorMessage='Email can not be found!'
           }
           throw new Error(errorMessage);
       }
       const resData= await response.json();
    }  
};

export const logout=()=>{
    AsyncStorage.removeItem('userData');
    return {
        type: LOG_OUT
    }
}

export const loggedIn=()=>{
    return {
        type:  LOGGED_IN
    }
}

const saveDataToStorage= async (token,userId,expirationDate)=>{
    try {
        await AsyncStorage.setItem(
            'userData', JSON.stringify({
                token: token,
                userId: userId,
                expirationDate: expirationDate
            })
        )
    } catch (error) {
        console.log(error)
    }  
};

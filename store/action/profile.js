import firestore from '@react-native-firebase/firestore';

export const GET_PROFILE='EDIT_PROFILE';

export const getProfile=()=>{
    return async (dispatch,getState) =>{
        const userId= getState().authenticate.loginAuth.userId;
        await firestore()
        .collection('Users')
       .onSnapshot(snap=>{
        const userProfiles = snap.docs.map(doc=>{
            return {
                ...doc.data()
            }
        });
        dispatch({type:GET_PROFILE, userProfile: userProfiles.find(profile=> profile.userId===userId)});
       });           
    }
};

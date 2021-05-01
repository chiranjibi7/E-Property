import firestore from '@react-native-firebase/firestore';
export const GET_PROPERTY='GET_PROPERTY';

export const getProperty=()=>{
    return async dispatch=>{
                await firestore()
                .collection('Properties')
                .orderBy('date','asc')
               .onSnapshot(snap=>{
                const allProperties = snap.docs.map(doc=>{
                    return {
                        ...doc.data()
                    }
                });
                dispatch({type:GET_PROPERTY, allProperties:allProperties})
               });           
     }   
    };

import { createSlice, configureStore } from '@reduxjs/toolkit'
import { auth } from '../../firebase';


//const user = ''

const counterSlice = createSlice({
  name: 'counter',
    initialState:{
          user:'',
          data:[],
          entries:[]
    },
  reducers: {
    addUser:(state, action)=>{
            state.user = action.payload.id;
            console.log(state.user,"......",action.payload.id);        
    },
   
    addData: (state, action) => {
      console.log(state.data);
      const value = state.data.unshift(action.payload);
      
    },
    delData:(state, action)=>{
     const data = state.data.filter((value)=>value.userId !== action.payload);
       console.log(action.payload)
       state.data = data;
    }, 
    updatedDiary:(state, action)=>{
      console.log(state.data, action.payload);
        const diariesUpdatedList = state.data.map((diary)=>{
          console.log(diary)
          if(diary.userId == action.payload.id){
            return {...diary, diaryName:action.payload.diaryName, diaryType:action.payload.diaryType}
            
          }
        return diary;
        });
        console.log(diariesUpdatedList);
        state.data = diariesUpdatedList;
        //console.log(state.data);
    },
    addEntry:(state, action)=>{
      console.log(action.payload);
      
      state.entries.push(action.payload);
      
      //state.entries.unshift(action.payload);
      /*const addedEntriesList = state.data.map((diary)=>{
        console.log(diary.id)
        if(diary.id === Number(action.payload.id)){
          return {...diary,action.payload};
          
        }
      return diary;
      });
      console.log(addedEntriesList);
      state.data = addedEntriesList;
    */},    
  
   delEntry:(state, action)=>{
    const data = state.entries.filter((entry)=>Number(entry.entryId) !== Number(action.payload));
      console.log(action.payload)
      state.entries = data;
   } 
  }
})
export const {addUser, addData, delData, updatedDiary, addEntry, delEntry } = counterSlice.actions
export default counterSlice.reducer;
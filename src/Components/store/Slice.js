import { createSlice, configureStore } from '@reduxjs/toolkit'


const user = ''

const counterSlice = createSlice({
  name: 'counter',
    initialState:{
          user,
          data:[],
          entries:[]
    },
  reducers: {
    addUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload.email;
    },
    addData: (state, action) => {
      console.log(state.data);
      const value = state.data.unshift(action.payload);
      
    },
    delData:(state, action)=>{
     const data = state.data.filter((value)=>value.id !== action.payload);
       console.log(action.payload)
       state.data = data;
    }, 
    updatedDiary:(state, action)=>{
      console.log(state.data);
        const diariesUpdatedList = state.data.map((diary)=>{
          console.log(diary)
          if(diary.id === Number(action.payload.id)){
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
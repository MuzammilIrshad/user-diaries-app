import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import { auth } from '../../firebase';

export interface data{
  diaryName:string | null |any
   diaryType:string | null | any
    userId:string | null
     date:string | null
      diaryId:string | null
}
export interface entries{
  id:string | null
   entryName:string | null
    entryTitle:string | null
     entryId:number | null
   date:string | null
}
//const user = ''
 type initialState = {
  user:string
  data:(data | null)[]
  entries:(entries|null)[]
}
const initialState:initialState = {
  user:'',
  data:[],
  entries:[]
}
type updatedDiary = {
  id:string | null
  diaryName:string | null
  diaryType:string | null
}
const counterSlice = createSlice({
  name: 'counter',
    initialState,
  reducers: {
    addUser:(state, action:PayloadAction<any>)=>{
            state.user = action.payload.id;
            console.log(state.user,"......",typeof action.payload);        
    },
   
    addData: (state, action:PayloadAction<data>) => {
      console.log(state.data);
      const value = state.data.unshift(action.payload);
      console.log(value)
    },
    delData:(state, action:PayloadAction<(string | null | undefined)>)=>{
     const remainingdata = state.data.filter((value:(data | null))=>Number(value?.diaryId) !== Number(action.payload));
       console.log(typeof action.payload)
       state.data = remainingdata;
    }, 
    updatedDiary:(state, action:PayloadAction<updatedDiary>)=>{
      console.log(state.data,typeof action.payload);
        const diariesUpdatedList = state.data.map((diary:(data | null))=>{
          console.log(diary)
          if(diary?.diaryId === action.payload.id){
            return {...diary, diaryName:action.payload.diaryName, diaryType:action.payload.diaryType}
            
          }
        return diary;
        });
        console.log(diariesUpdatedList);
        state.data = diariesUpdatedList;
        //console.log(state.data);
    },
    addEntry:(state, action:PayloadAction<entries>)=>{
      console.log(action.payload);
      
      //state.entries.push(action.payload);
      
     const value = state.entries.unshift(action.payload);
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
  
   delEntry:(state, action:PayloadAction<(number | null | undefined)>)=>{
    const data = state.entries.filter((entry:(entries | null))=>Number(entry?.entryId) !== Number(action.payload));
      console.log(action.payload)
      state.entries = data;
   } 
  }
})
export const {addUser, addData, delData, updatedDiary, addEntry, delEntry } = counterSlice.actions
export default counterSlice.reducer;
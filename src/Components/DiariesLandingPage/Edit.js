import React, { useState } from 'react'
import * as Diaries from "./Diaries.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {updatedDiary} from '../store/Slice';

export default function Edit(props) {
    const {id} = useParams();
    console.log(typeof id);
   const diaryData = useSelector((state)=>state.diaries.data);
   const preData = diaryData.filter((diary)=>diary.id === Number(id));
   console.log(preData[0].diaryName);
    const [diaryName, setDiaryName] = useState(preData[0].diaryName);
    const [diaryType, setdiaryType] = useState(preData[0].diaryType);
   console.log(diaryName, diaryType);
   const dispatch = useDispatch(); 
   const handleDiaryData = (e)=>{
             e.preventDefault();
        dispatch(updatedDiary({diaryName, diaryType, id}));
        console.log(id);
    }
    return (
        <div>
            hello world
            <div className={Diaries.data}>
                <form onSubmit={handleDiaryData}>
                  <input type='text' id={Diaries.diaryName}value={diaryName} onChange={(e)=>setDiaryName(e.target.value)}/><br/>
                 <div className={Diaries.diaryType}>
                  <input type="radio" value="male" id="male"
                   name="gender" onChange={(e)=>setdiaryType(e.target.value)} />
                  <label htmlFor="male">Male</label>
                  </div>
                  <div className={Diaries.diaryType}>
               <input type="radio" value="female" id="female"
                 name="gender" onChange={(e)=>setdiaryType(e.target.value)}/>
                <label htmlFor="female">Female</label>
                   </div>
                  <input type='submit'value='ADD DIARY'id={Diaries.addDiaryData}/>
                  <Link to='/diaries'>Diaries</Link>
                </form>
              </div>
        </div>
    )
}

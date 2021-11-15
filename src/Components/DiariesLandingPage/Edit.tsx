import React, { useState } from 'react'
import * as Diaries from "./Diaries.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import {updatedDiary} from '../store/Slice';
import Swal from 'sweetalert2';
import { AppDispatch, RootState } from '../store/Store';

export default function Edit() {
    const {id}:{id:string} = useParams();

    const history = useHistory()
    console.log(id);
   const diaryData = useSelector((state:RootState)=>state.diaries.data);
   const preData = diaryData.filter((diary)=>Number(diary?.diaryId) === Number(id));
   console.log(diaryData);
    const [diaryName, setDiaryName] = useState<string>(preData[0]?.diaryName);
    const [diaryType, setdiaryType] = useState<string>(preData[0]?.diaryType);
   console.log(diaryName, diaryType);
   const dispatch: AppDispatch = useDispatch()
   const handleDiaryData = (e: React.FormEvent<EventTarget>)=>{
             e.preventDefault();
             console.log(diaryName, diaryType, id);
             if(diaryName && diaryType){
              
        dispatch(updatedDiary({diaryName, diaryType, id}));
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            
            Swal.fire('Saved!', '', 'success').then((res)=>{
              history.push("/diaries");
            })
            
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
        console.log(id);
        
    }
  }
    return (
        <div>
            
            <div className={Diaries.data} style={{marginTop:'3em', marginInline:'auto'}}>
                <form onSubmit={(e)=>handleDiaryData(e)}>
                  <input type='text' id={Diaries.diaryName}value={diaryName} onChange={(e)=>setDiaryName(e.target.value)}className={Diaries.editName}/><br/>
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
                  <input type='submit'value='UPDATE DIARY'id={Diaries.addDiaryData}/>
                  <Link to='/diaries'>Diaries</Link>
                </form>
              </div>
        </div>
    )
}

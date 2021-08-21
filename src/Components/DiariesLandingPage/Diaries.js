import React, { useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import * as Diaries from "./Diaries.module.css";
import { BsLockFill } from "react-icons/bs";
import { MdEdit, MdDelete, MdPlayArrow, MdAddCircle } from "react-icons/md";
import ToggleButton from "react-toggle-button";
import Modali, { useModali } from 'modali';
import { addData, delData } from '../store/Slice';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useRouteMatch} from 'react-router-dom';
import moment from 'moment';



export default function DiariesPage() {
  let { path, url } = useRouteMatch();
  const list = useSelector((state)=>state.diaries.data);
  const entryCount = useSelector((state)=>state.diaries.entries);
  const userId = useSelector((state)=>state.diaries.user);
console.log(list);
  const [isOpen, setisOpen] = useState(false);
  const [exampleModal, toggleExampleModal] = useModali();
  const [diaryName, setdiaryName] = useState('');
  const [diaryType, setdiaryType] = useState('');
 const dispatch = useDispatch();
 //const id = userId
 console.log(userId);
const handleDiaryData = (e)=>{
        e.preventDefault();
        const date = moment().format('LLL');
        console.log(diaryName, diaryType, date);
        
      const diaryData = {diaryName, diaryType, userId, date};
      console.log(diaryData)
        dispatch(addData(diaryData));
}
const handleDelete = (userId) =>{
  dispatch(delData(userId));
  console.log(userId);
}
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} lg={8} xs={12}>
            <div id={Diaries.list}>
              <h1>
               <p style={{paddingTop:'1em'}}> Diaries List</p>
                <div>
                 <p style={{display: 'flex',fontSize: '24px', color: 'azure',marginTop: '0.5em', fontWeight:'bolder'}}>My Diaries
                <span  style={{marginLeft:'1em', marginTop:'0.3em'}}>
                <ToggleButton
                  value={isOpen}
                  onToggle={(value) => setisOpen(!value)}
                 
                /></span></p>
                <p style={{fontSize:'24px', color:'azure', cursor:'pointer',fontWeight:'bolder'}} onClick={toggleExampleModal}>
                  Add Diary
                  <span style={{paddingLeft:'1.3em',color:'azure'}}><MdAddCircle/></span></p>
                </div>
              </h1>
              <Modali.Modal {...exampleModal} style={{background: '#d4bb9e'}} className={Diaries.modali_header}>
                <form onSubmit={handleDiaryData} style={{background: '#d4bb9e'}}>
                  <input type='text' id={Diaries.diaryName} style={{background: 'none'}} onChange={(e)=>setdiaryName(e.target.value)}/><br/>
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
                </form>
              </Modali.Modal>
              <hr />
              {list && list.map((diary)=>{
                const id = diary.userId;
                 //let count = 0;
               let entriesCount = entryCount.filter((entries)=>Number(entries.id) === id);
                
                console.log(typeof userId)
                console.log(entriesCount.length);
             return(
             <div className={Diaries.data} key={diary.id}>
                <h2>
                  {diary.diaryName}{" "}
                  <div>
                    <i>
                      <BsLockFill />
                    </i>
                    <i>
                    <Link to={`/diaries/diary/${userId}`}>
                    <MdEdit/>
                    </Link>
                    </i>
                    <i>
                      <MdDelete onClick={()=>dispatch(delData(userId))}/>
                    </i>
                  </div>
                </h2>
                <div className={Diaries.user}>
                  <p>
                    <span>
                    Uploaded by Muzammil Irshad
                    </span>
                    <span className={Diaries.date}>{diary.date}</span>
                  </p>
                  <div>{entriesCount.length} saved {entriesCount.length < 2 ? 'Entry':'Entries'}</div>
                </div>
                <Link to={"/diary/"+userId+"/entries"} className={Diaries.link}>
                  Visit Entries <MdPlayArrow />
                </Link>
              </div>
              )})}
            </div>
         
          </Col>
        </Row>
      </Container>
    </>
  );
}

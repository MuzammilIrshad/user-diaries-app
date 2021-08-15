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
  
console.log(list);
  const [isOpen, setisOpen] = useState(false);
  const [exampleModal, toggleExampleModal] = useModali();
  const [diaryName, setdiaryName] = useState('');
  const [diaryType, setdiaryType] = useState('');
 const dispatch = useDispatch();
 const id = Math.random();
const handleDiaryData = (e)=>{
        e.preventDefault();
        const date = moment().format('LLL');
        console.log(diaryName, diaryType, date);
        
      const diaryData = {diaryName, diaryType, id, date};
      console.log(diaryData)
        dispatch(addData(diaryData));
}
const handleDelete = (id) =>{
  dispatch(delData(id));
  console.log(id);
}
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} lg={8}>
            <div id={Diaries.list}>
              <h1>
               <p style={{paddingTop:'1em'}}> Diaries List</p>
                <div>
                 <p style={{display: 'flex',fontSize: '24px', color: 'black',marginTop: '0.5em', fontWeight:'bolder'}}>My Diaries
                <span  style={{marginLeft:'1em', marginTop:'0.3em'}}>
                <ToggleButton
                  value={isOpen}
                  onToggle={(value) => setisOpen(!value)}
                 
                /></span></p>
                <p style={{fontSize:'24px', color:'black', cursor:'pointer',fontWeight:'bolder'}} onClick={toggleExampleModal}>
                  Add Diary
                  <span style={{paddingLeft:'1.3em',color:'black'}}><MdAddCircle/></span></p>
                </div>
              </h1>
              <Modali.Modal {...exampleModal}>
                <form onSubmit={handleDiaryData}>
                  <input type='text' id={Diaries.diaryName} onChange={(e)=>setdiaryName(e.target.value)}/><br/>
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
                const id = diary.id;
                 //let count = 0;
               let entriesCount = entryCount.filter((entries)=>Number(entries.id) === Number(id));
                
                console.log(typeof id)
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
                    <Link to={`/diaries/diary/${id}`}>
                    <MdEdit/>
                    </Link>
                    </i>
                    <i>
                      <MdDelete onClick={()=>dispatch(delData(id))}/>
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
                <Link to={"/diary/"+id+"/entries"} className={Diaries.link}>
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

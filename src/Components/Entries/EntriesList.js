import React, { useState } from "react";
import * as Entries from "./Entries.module.css";
import { BsLockFill } from "react-icons/bs";
import { MdEdit, MdDelete, MdPlayArrow, MdAddCircle } from "react-icons/md";
import Modali, { useModali } from "modali";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEntry, delEntry } from "../store/Slice";
import { Row, Container, Col } from "react-bootstrap";
import moment from 'moment';


export default function EntriesList() {
  const { id } = useParams();
  console.log(id);
  const [exampleModal, toggleExampleModal] = useModali();
  const [entryName, setEntryName] = useState("");
  const [entryTitle, setEntryTitle] = useState("");
  const dispatch = useDispatch();
  const entriesList = useSelector((state) =>
    state.diaries.entries.filter((entry) => entry.id === id)
  );
  //const [entries, setEntries] = useState();
  console.log(entriesList);
  const diaryEntries = entriesList.filter((entry) => entry.id === id);
  //diaryEntries.map((diary)=>console.log(diary.diaryName));
  console.log(diaryEntries);
  const handleDiaryData = (e) => {
    e.preventDefault();
    const date = moment().format('LLL');
    const entryId = new Date().getTime();
    const entryData = { id, entryName, entryTitle, entryId, date };
    dispatch(addEntry(entryData));
    console.log(entryId, entryData);
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} lg={10}>
            <h1 style={{paddingTop: '1em',fontFamily: 'cursive',paddingLeft: '2em'}}>
              <p style={{ paddingTop: "1em",color:'beige' }}> Entries List</p>
              <div>
                <p
                  style={{
                    fontSize: "24px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={toggleExampleModal}
                >
                  Add Entry
                  <span style={{ paddingLeft: "1.3em", color: "white" }}>
                    <MdAddCircle />
                  </span>
                </p>
              </div>
            </h1>

            <Modali.Modal {...exampleModal}>
              <form onSubmit={handleDiaryData}>
                <label>Title</label>
                <input
                  type="text"
                  id={Entries.diaryName}
                  onChange={(e) => setEntryTitle(e.target.value)}
                />
                <br />
                <label>Text</label>
                <input
                  type="text"
                  id={Entries.diaryName}
                  onChange={(e) => setEntryName(e.target.value)}
                />
                <br />

                <input
                  type="submit"
                  value="ADD ENTRY"
                  id={Entries.addDiaryData}
                />
              </form>
            </Modali.Modal>
            <hr />
            {entriesList &&
              entriesList.map((entry) => {
                console.log(entry);
                const entryId = entry.entryId;
                console.log(typeof entryId);
                const handleDelete = () => {
                  dispatch(delEntry(entryId));
                  console.log(entry.id);
                };
                return (
                  <div className={Entries.data} key={entry.entryId}>
                    <h2>
                      {entry.entryTitle}
                      <div>
                       
                        <i onClick={handleDelete} style={{cursor:'pointer'}}>
                          <MdDelete />
                        </i>
                      </div>
                    </h2>
                    <div className={Entries.user}>
                      <p>
                        {entry.entryName}
                        <br />
                        <span className={Entries.date}>{entry.date}</span>
                      </p>
                     
                    </div>
                    
                  </div>
                );
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

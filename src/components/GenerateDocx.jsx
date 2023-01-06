import React from 'react'
import { Button } from 'monday-ui-react-core';
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

function GenerateDocx({boardId}) {
    const handleGenerateDocxClick = () =>{
        monday.api(`query { boards(ids:${boardId}) { columns {   title   type } } }`).then((res)=>{
            
        })
    }
  return (
    <Button>Generate Docx</Button>
  )
}

export default GenerateDocx
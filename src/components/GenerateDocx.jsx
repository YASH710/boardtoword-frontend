import React from "react";
import { Button } from "monday-ui-react-core";
import mondaySdk from "monday-sdk-js";
import UploadFile from "./UploadFile";
import { useEffect, useState } from "react";

const monday = mondaySdk();

function GenerateDocx({ boardId, templateUploaded, checkExistingTemplate }) {
  
  const getBoardData = async () => {
    try{
      const colsApiResult = await monday.api(`query { boards(ids:${boardId}) { columns { id title type } } }`);
      const [,,...columns] = colsApiResult.data.boards[0].columns.reduce((arr, curr)=>{arr.push(curr.id);return arr},[]);
      const boardItemsApiResult = await monday.api(`query {boards(ids:${boardId}) {items(limit:10) { name column_values(ids:[${columns.join(',')}]) {id title text}}}}`);
      const resultArr = boardItemsApiResult.data.boards[0].items.map(data=>{
        return [{id: 'name',title: 'Name', text: data.name }, ...data.column_values]
      })
      console.log(resultArr);
      return resultArr
    } catch(e){
      console.error('Something went wrong', e);
    }
  };

  const download = async ()=> {
    const url = 'https://assignment.thefluxbyte.com/api/boardtoword/generate';
    const data = await getBoardData();
    const requestBody = {
      data,
      boardId
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const blob = await response.blob();
      // Create a link element to trigger the download
      let link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "generated-document.docx";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.log(err);
    }
  }

  const uploadFile = async (data) => {
    try{
      let formData = new FormData();
      const fileNameList = data.name.split(".");
      if (fileNameList[fileNameList.length - 1] === "docx") {
        const fileName = "template_" + boardId + '.docx';
        formData.append("file", data, fileName);
        // Send the file to the server using an HTTP POST request
        await fetch("https://assignment.thefluxbyte.com/api/boardtoword/upload-template", {
          method: "POST",
          body: formData,
        });
        checkExistingTemplate(boardId);
      } else {
        alert("You can upload .docx file as template only.");
      }
      
    }catch(e){
      console.log(e)
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="container-item">
          <UploadFile onChange={uploadFile}></UploadFile>
        </div>
        <div className="container-item">
          <div className="download-container">
            {templateUploaded ? <Button onClick={() => download()}>Generate Docx</Button>
            :"Please upload template to generate docx"}
          </div>
        </div>
      </div>
    </>
  );
}

export default GenerateDocx;

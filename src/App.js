import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import GenerateDocx from "./components/GenerateDocx";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [boardId, setBoardId] = useState('default');
  const [templateUploaded, setTemplateUploaded] = useState(false);
  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      setBoardId(res.data.boardId);
      console.log("context", res.data);
      checkExistingTemplate(res.data.boardId);
    });
  }, []);

  const checkExistingTemplate = async(boardId) =>{
    try{
      const response = await fetch("https://assignment.thefluxbyte.com/api/boardtoword/template-exist",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({boardId}),
      })
      const jsonRes = await response.json(); 
      setTemplateUploaded(jsonRes.exist);
    }catch(e){
      setTemplateUploaded(false);
      console.error(e)
    }
  }

  return (
    <div className="App">
      <GenerateDocx boardId={boardId} templateUploaded={templateUploaded} checkExistingTemplate={checkExistingTemplate}/>
    </div>
  );
};

export default App;

import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import GenerateDocx from "./components/GenerateDocx";
import axios from "axios";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [boardId, setBoardId] = useState();
  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");
    monday.listen("settings", (res) => {
      setBoardId(res.data.boardId);
      console.log("context", res.data);
    });

    axios.post('http://localhost:9000/api/boardtoword/generate',{}).then(res=>{
      console.log(res);
    }).catch(er=>{
      console.log(er);
    })
  }, []);

  return (
    <div className="App">
      <GenerateDocx boardId={boardId}/>
    </div>
  );
};

export default App;

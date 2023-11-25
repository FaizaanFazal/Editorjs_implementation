import EditorJS from "@editorjs/editorjs";
import './App.css';
import { useEffect, useRef } from "react";
import Header from '@editorjs/header'; 

function App() {
 
  const DEFAULT_INITIAL_DATA =  {
    "time": new Date().getTime(),
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "This is my First Editor!!!",
          "level": 1
        }
      },
    ]
}

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        header: Header,
      },
    });
  };


  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className="App" id="editorjs">

    </div>
  );
}

export default App;

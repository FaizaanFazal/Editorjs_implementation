import EditorJS from "@editorjs/editorjs";
import './App.css';
import { useEffect, useRef } from "react";
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import SimpleImage from "@editorjs/simple-image";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';


function App() {

  const DEFAULT_INITIAL_DATA = {
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
        quote: Quote,
        image: SimpleImage, //configuration not done
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool, //to do
          config: {
            endpoint: "https://codex.so/public/app/img/meta_img.png", // Your backend endpoint for url data fetching,
          }
        },
        embed: Embed, //todo

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

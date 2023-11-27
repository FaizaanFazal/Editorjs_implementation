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
import Table from '@editorjs/table'
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';

function App() {

  const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "First text editor with dummy pre saved data",
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
        embed: {
          class: Embed,
          inlineToolbar: true
        }, //todo
        table: Table,
        delimiter: Delimiter,
        warning: {
          class: Warning,
          inlineToolbar: true,
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
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

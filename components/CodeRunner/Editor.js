import {useEffect} from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import theme from './editor-theme';


const CodeEditor = ({params}) => {
  const monaco = useMonaco();
  const snippet = params.children[0].split("\n").slice(1).join("\n");
  console.log({params, snippet})

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('mytheme', theme);
      monaco.editor.setTheme('mytheme');
    }
  }, [monaco]);

  const setEditor = (moncao, editor) => {
    // debugger;
    // editor.layout();
  }

  //https://monaco-react.surenatoyan.com/
  return (
    <Editor
      height="90vh"
      theme="dark"
      defaultLanguage={params.language}
      defaultValue={snippet}
      onMount={setEditor}
      automaticLayout={true}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 18,
      }}
    />
  );
};

export default CodeEditor;

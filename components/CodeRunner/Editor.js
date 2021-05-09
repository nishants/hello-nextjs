import {useEffect} from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import theme from './editor-theme';


const CodeEditor = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('mytheme', theme);
      monaco.editor.setTheme('mytheme');
    }
  }, [monaco]);

  //https://monaco-react.surenatoyan.com/
  return (
    <Editor
      height="90vh"
      theme="dark"
      defaultLanguage="csharp"
      defaultValue="// some code"
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

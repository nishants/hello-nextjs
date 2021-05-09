import {useEffect} from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import theme from './editor-theme';

const approxLineHeight = 50;

const CodeEditor = ({params}) => {
  const monaco = useMonaco();
  const codeLines = params.children[0].split("\n").slice(1);
  const snippet = codeLines.join("\n");
  const height = codeLines.length * approxLineHeight;
  console.log({params, snippet})

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('mytheme', theme);
      monaco.editor.setTheme('mytheme');
    }
  }, [monaco]);

  const setEditor = (editor, moncao) => {
    window.editor = editor;
    window.moncao = moncao;
    // editor.layout();
  }

  //https://monaco-react.surenatoyan.com/
  return (
    <Editor
      height={height}
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

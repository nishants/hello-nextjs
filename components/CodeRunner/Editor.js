import {useEffect, useState} from "react";
import Editor, {  useMonaco, loader } from "@monaco-editor/react";
import theme from './editor-theme';
import {runCode} from './index';

const approxLineHeight = 50;

const CodeEditor = ({params}) => {
  const monaco = useMonaco();
  const codeLines = params.children[0].split("\n").slice(1);
  const snippet = codeLines.join("\n");
  const height = codeLines.length * approxLineHeight;
  const [isReady, setReady] = useState(false);
  const [output, setOutput] = useState('');
  const [code, setCode] = useState(snippet);
  const [isRunning, setRunning] = useState(false);

  const execute = async () => {
    setRunning(true);
    const output = await runCode(params.language, code);
    setRunning(false);

    const {error, errorLineNumber, consoleOutput} = output;
    if(!error){
      return setOutput(consoleOutput.join("\n"));
    }
    setOutput(`Error at line number ${errorLineNumber} : ${error}`);
  }

  const onCodeChange = (code, event) => {
    setCode(code);
  }

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('mytheme', theme);
      monaco.editor.setTheme('mytheme');
      setReady(true);
    }
  }, [monaco]);

  const setEditor = (editor, moncao) => {
    window.editor = editor;
    window.moncao = moncao;
    // editor.layout();
  }

  //https://monaco-react.surenatoyan.com/
  const opacity = `${isReady  ? isRunning ? "50%" : "100%" : "0"}`;
  const pointerEvents = `${isRunning ? "none": ""}`
  return (
    <div style={{opacity, pointerEvents}}>
      <Editor
        height={height}
        theme="dark"
        defaultLanguage={params.language}
        defaultValue={snippet}
        onMount={setEditor}
        automaticLayout={true}
        onChange={onCodeChange}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 18,
        }}
      />
      <button onClick={execute}>Run</button>
      <div className="code-output" style={{height: "100px", width: "100%" , background :"#efefef"}}>
        {output}
      </div>
    </div>
  );
};

export default CodeEditor;

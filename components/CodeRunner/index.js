import runJs from './js-runner';
import runCsharp from './csharp-runner';

const commentSymbols = {
  javascript: "//",
  java: "//",
  csharp: "//",
}

const runners = {
  javascript: runJs,
  csharp: runCsharp,
}

export const isRunnerBlock = ({language, node, children}) => {
  const firstLine = children[0]?.replace(/ /g, '');
  return firstLine.startsWith(`${commentSymbols[language]}runner`);
}

export const runCode = (language, code) => {
  return runners[language](code);
}

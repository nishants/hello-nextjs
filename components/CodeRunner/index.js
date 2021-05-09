import runJs from './js-runner';

const commentSymbols = {
  javascript: "//",
  java: "//",
  csharp: "//",
}

const runners = {
  javascript: runJs
}

export const isRunnerBlock = ({language, node, children}) => {
  const firstLine = children[0]?.replace(/ /g, '');
  return firstLine.startsWith(`${commentSymbols[language]}runner`);
}

export const runCode = async (language, code) => {
  const output = await runners[language](code);
  return output;
}

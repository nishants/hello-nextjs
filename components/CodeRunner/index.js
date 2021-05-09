const commentSymbols = {
  javascript: "//",
  java: "//",
  csharp: "//",
}

export const isRunnerBlock = ({language, node, children}) => {
  const firstLine = children[0]?.replace(/ /g, '');
  return firstLine.startsWith(`${commentSymbols[language]}runner`);
}

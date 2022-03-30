export const buildKeystoneDoc = (desc: any[], id: string) => {
  const fullDesc = [];
  for (const [index, line] of desc.entries()) {
    const fullLine = line.children.map((text: any, lineIndex: number) => {
      let className = "";
      if (text.bold) className += "font-bold ";
      if (text.italic) className += "italic ";
      return <span className={className} key={`${index} ${lineIndex} ${id}`}>{text.text} </span>
    });

    fullDesc.push(fullLine);
  }

  return fullDesc;
}
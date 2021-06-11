import { ChangeEvent } from "react";

export default function Editor(props: { onChange: (newTokens: string[]) => void }) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    const newTokens = parse(value);
    props.onChange(newTokens);
  }

  return (
    <div className="Editor">
      <textarea className="TextArea" onChange={handleChange} />
    </div>
  );
}

function parse(text: string) {
  return Array.from(text).filter(ch => {
    return ch.match(/<|>|\+|-|\[|\]/);
  });
}

import { ChangeEvent } from "react";

export default function Editor(props: { onTokens: (newTokens: string[]) => void, onInput: (newInput: number[]) => void }) {
  function handleTokens(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    const newTokens = parseTokens(value);
    props.onTokens(newTokens);
  }

  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    const newInput = parseInput(value);
    props.onInput(newInput);
  }

  return (
    <div className="Editor">
      <textarea className="TextArea" onChange={handleTokens} />
      <textarea className="TextArea" onChange={handleInput} />
    </div>
  );
}

function parseTokens(text: string) {
  const tokens = Array.from(text).filter(ch => {
    return ch.match(/<|>|\+|-|\[|\]|\.|,/);
  });

  let stack = 0;
  let valid = true;
  tokens.forEach(ch => {
    switch (ch) {
      case "[":
        stack += 1;
        break;
      case "]":
        stack -= 1;
        break;
    }

    if (stack < 0) {
      valid = false;
    }
  });

  valid = valid && stack === 0;

  return valid ? tokens : [];
}

function parseInput(text: string) {
  return Array.from(text).map(ch => {
    const num = Number(ch);
    return isNaN(num) ? 0 : num;
  });
}

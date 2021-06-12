import Editor from "./Editor";
import Tape from "./Tape";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [tokens, setTokens] = useState(new Array<string>());
  const [input, setInput] = useState(new Array<number>());

  function handleTokens(newTokens: string[]) {
    setTokens(newTokens);
  }

  function handleInput(newInput: number[]) {
    setInput(newInput);
  }

  return (
    <div className="App">
      <Editor onTokens={handleTokens} onInput={handleInput} />
      <Tape tokens={tokens} input={input} />
    </div>
  );
}

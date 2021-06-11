import Editor from "./Editor";
import Tape from "./Tape";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [tokens, setTokens] = useState(new Array<string>());

  function handleChange(newTokens: string[]) {
    setTokens(newTokens);
  }

  return (
    <div className="App">
      <Editor onChange={handleChange} />
      <Tape tokens={tokens} />
    </div>
  );
}

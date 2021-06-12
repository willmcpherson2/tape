import { useEffect, useReducer } from "react";

class State {
  tape = Array<number>(10).fill(0);
  tokenIndex = 0;
  tapeIndex = 0;
}

function clone(state: State): State {
  return { ...state, tape: [...state.tape] };
}

export default function Tape(props: { tokens: string[] }) {
  const [state, setState] = useReducer(step, new State());

  useEffect(() => {
    setState(null);

    const id = setInterval(() => {
      setState(props.tokens);
    });

    return () => clearInterval(id);
  }, [props.tokens]);

  const cells = state.tape.map((value, i) => <Cell value={value} key={i} />);
  return <div className="Tape">{cells}</div>;
}

function Cell(props: { value: number }) {
  return (
    <div className="Cell">
      {props.value}
    </div>
  );
}

function step(state: State, tokens: string[] | null): State {
  if (tokens === null) {
    return new State();
  }

  let { tape, tokenIndex, tapeIndex } = clone(state);

  if (tokens[tokenIndex]) {
    switch (tokens[tokenIndex]) {
      case "<":
        tapeIndex -= 1;
        tokenIndex += 1;
        break;
      case ">":
        tapeIndex += 1;
        tokenIndex += 1;
        break;
      case "+":
        tape[tapeIndex] += 1;
        tokenIndex += 1;
        break;
      case "-":
        tape[tapeIndex] -= 1;
        tokenIndex += 1;
        break;
      case "[":
        if (tape[tapeIndex]) {
          tokenIndex += 1;
        } else {
          while (tokens[tokenIndex] !== "]") {
            tokenIndex += 1;
          }
          tokenIndex += 1;
        }
        break;
      case "]":
        while (tokens[tokenIndex] !== "[") {
          tokenIndex -= 1;
        }
        break;
    }
  };

  return { tape, tokenIndex, tapeIndex };
}

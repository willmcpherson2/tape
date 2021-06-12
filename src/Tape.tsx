import { useEffect, useReducer } from "react";

class State {
  tape = Array<number>(40).fill(0);
  tokenIndex = 0;
  tapeIndex = 0;
  inputIndex = 0;
  outputIndex = 0;
  output = Array<number>(40).fill(0);
}

function clone(state: State): State {
  return {
    tape: [...state.tape],
    tokenIndex: state.tokenIndex,
    tapeIndex: state.tapeIndex,
    inputIndex: state.inputIndex,
    outputIndex: state.outputIndex,
    output: [...state.output],
  };
}

export default function Tape(props: { tokens: string[], input: number[] }) {
  const [state, setState] = useReducer(step, new State());

  useEffect(() => {
    setState(null);

    const id = setInterval(() => {
      setState([props.tokens, props.input]);
    });

    return () => clearInterval(id);
  }, [props.tokens, props.input]);

  const cells = state.tape.map((value, i) => <Cell value={value} key={i} />);
  const output = state.output.map((value, i) => <Cell value={value} key={i} />);
  return (
    <div>
      <div className="Tape">{cells}</div>
      <div className="Tape">{output}</div>
    </div>
  );
}

function Cell(props: { value: number }) {
  return (
    <div className="Cell">
      {props.value}
    </div>
  );
}

function step(state: State, props: [string[], number[]] | null): State {
  if (props === null) {
    return new State();
  }

  const [tokens, input] = props;

  let { tape, tokenIndex, tapeIndex, inputIndex, outputIndex, output } = clone(state);

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
          let stack = 0;
          while (true) {
            switch (tokens[tokenIndex]) {
              case "[":
                stack += 1;
                tokenIndex += 1;
                break;
              case "]":
                stack -= 1;
                tokenIndex += 1;
                break;
              default:
                tokenIndex += 1;
            }
            if (stack === 0) {
              break;
            }
          }
        }
        break;
      case "]":
        let stack = 0;
        while (true) {
          switch (tokens[tokenIndex]) {
            case "[":
              stack += 1;
              tokenIndex -= 1;
              break;
            case "]":
              stack -= 1;
              tokenIndex -= 1;
              break;
            default:
              tokenIndex -= 1;
          }
          if (stack === 0) {
            tokenIndex += 1;
            break;
          }
        }
        break;
      case ".":
        const value = tape[tapeIndex];
        if (value !== undefined) {
          output[outputIndex] = value;
        }
        outputIndex += 1;
        tokenIndex += 1;
        break;
      case ",":
        tape[tapeIndex] = input[inputIndex];
        inputIndex += 1;
        tokenIndex += 1;
    }
  }

  return { tape, tokenIndex, tapeIndex, inputIndex, outputIndex, output };
}

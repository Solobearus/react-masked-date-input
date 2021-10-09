import React, {useState, useRef, useEffect} from 'react';
import './App.css';

const inputMask = 'dd/mm/yyyy';

function App() {

  const [displayInput, setDisplayInput] = useState<string>(inputMask);
  const value = useRef<string>('');
  const lastCursorPosition = useRef<null | number>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(lastCursorPosition.current && inputElement.current){
      const position = lastCursorPosition.current;
      inputElement?.current?.setSelectionRange(position, position);
    }
  },[displayInput]);

  const reformatDisplayInput = () => {
    let indexAdjusting = 0;

    const newDisplayInput = inputMask.split('').map((char,index) => {
      if(value.current && char.match(/[mdy]/) ){
        return value.current[index - indexAdjusting] || char;
      } else{
        indexAdjusting++;
        return char;
      }
    }).join('');

    setDisplayInput(newDisplayInput);
  }

  const onKeyDown = (event : React.ChangeEvent<HTMLInputElement>) => {
    lastCursorPosition.current = event.target.selectionStart;
    value.current = event.target.value.split(/\D+/).join('');
    reformatDisplayInput();
  }

  return (
    <>
      <input type={"text"} value={displayInput} onChange={onKeyDown} ref={inputElement}/>
      {value.current}
    </>
  );
}

export default App;

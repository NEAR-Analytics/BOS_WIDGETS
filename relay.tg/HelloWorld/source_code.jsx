/*
  Welcome to the BOS Web Engine Sandbox!

  This environment has TypeScript support. All changes in this IDE 
  are automatically persisted in local storage. Feel free to add, 
  remove, and rename files.
  
  The following code example demonstrates multi file component editing 
  capabilities. Try opening up Message.tsx from the file explorer, 
  make a visible code change, and then come back to HelloWorld.tsx
  to see your changes reflected in the imported component.
*/

import { useState } from 'react';
import Message from './Message';
import s from './styles.module.css';

function HelloWorld() {
  const [count, setCount] = useState(0);

  return (
    <div className={s.wrapper}>
      <h1>Welcome!</h1>

      <Message props={{ message: 'Hello world!' }} />

      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increase Count: {count}
      </button>
    </div>
  );
}

export default HelloWorld as BWEComponent;

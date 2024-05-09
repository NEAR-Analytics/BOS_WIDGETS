import {Prism} from 'react-syntax-highlighter';

export function BWEComponent() {
  const codeString = '(num) => num + 1';
  return (
    <div>
      hi
      <Prism language="javascript">
        {codeString}
      </Prism>
    </div>
  );
};
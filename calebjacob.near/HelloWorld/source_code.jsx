/*
  Welcome to the BOS Web Engine Sandbox!

  This environment has TypeScript support. All changes in this IDE 
  are automatically persisted in local storage. Feel free to add, 
  remove, and rename files.
  
  For now, you should reference "bwe-web.near" in the src prop 
  when creating a new  component and referencing it via <Component />. 
  For example: "bwe-web.near/MyNewComponent.tsx". We will support 
  signing in and referencing your own account soon.
  
  The following code example demonstrates multi file component editing 
  capabilities. Try opening up Message.tsx from the file explorer, 
  make a visible code change, and then come back to HelloWorld.tsx
  to see your changes reflected in the <Component /> reference.
*/

export function BWEComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Welcome!!</h1>

      <Component
        src="bwe-web.near/Message"
        props={{ message: 'Hello world!' }}
        /*
          The props object for <Component /> doesn't support type 
          safety at the moment due to the dynamic complexities 
          involved. Implementing type safety for props is a long 
          term goal.
        */
      />

      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increase Count: {count}
      </button>
    </div>
  );
}

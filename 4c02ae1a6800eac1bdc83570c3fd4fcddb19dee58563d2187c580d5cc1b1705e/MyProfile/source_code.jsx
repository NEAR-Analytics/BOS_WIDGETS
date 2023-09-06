State.init({
    img: null,
    name: "My Name is..",
    greeting: "I am.."
    });


const onNameChange = ({target}) => { State.update({name: target.value }) };

const onGreetingChange = ({target}) => { State.update({greeting: target.value }) };

return (
  <>
  <div class="container border border-info p-3 min-vw-100">
      {state.img.cid && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
          alt='uploaded' 
          width="100" 
          height="100"
        />
      )}
      <p><b> Name: </b>  {state.name} </p>
      <p><b> self-introduction: </b>  {state.greeting} </p>

      <label class="text-left">Write your Name</label>
      <input onChange={onNameChange} />

      <label class="text-left">Write the self-introduction</label>
      <input onChange={onGreetingChange} />

       Upload your PFP<br />
      <IpfsImageUpload image={state.img} />
    </div>
  </>
);


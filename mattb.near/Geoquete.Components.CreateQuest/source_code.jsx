const CreateQuest = styled.div`
        margin: 0 auto;
        width:100%;
        max-width: 400px;
        border: 1px solid rgba(0,0,0, .15);
        padding: 1.5rem;
        border-radius: .7rem;
        box-shadow: .3rem .3rem 1rem rgba(0,0,0, .1);
        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
        }
        input, textarea {
            resize: none;
            &::placeholder {
                font-size: .8rem;
            }
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }

            &:placeholder-shown {
                & + label {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-1rem);
                }
                & + .eth-label {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(-18rem);
                }
            }
        }

        label {
            font-size: .8rem;
            color: rgba(0,0,0,.4);
            margin-left: .8rem;
            margin-top: .2rem;
            display: block;
            transition: all .3s;
        }

        ul { 
          list-style-type: none;
          position: relative;
        }

        li {
          width: 100%;
          position: absolute;
          border: 1px solid rgba(0,0,0, .1);
          top: 2px;
          left: 0;
          padding: 8px;
          border-radius: 5px; 
          background-color: white;
          box-shadow: 1px 4px 8px rgba(0,0,0,.2);
          font-size: .8rem;

          &:hover {
            cursor: pointer;
            background-color: #f0eded;
          }
        }

        .eth-label {
            margin-top: -1.7rem;
            margin-left: 19rem;
            margin-bottom: 2.6rem;
        }
        .form-group {
            margin-bottom: .5rem;
        }
`;

const LocationList = styled.div`
    .location-wrapper {
        position:relative;

        &:not(:last-of-type) {
            margin-bottom:1rem;
        }

        &::before {
            content:'';
            width:5px;
            height:5px;
            background-color:rgb(73, 159, 245);
            border-radius:100%;
            position:absolute;
            top:0;
            bottom:0;
            margin: auto;
        }

        &::after {
            content:'';
            width:2px;
            height:100%;
            background-color:rgba(0,0,0,.2);
            border-radius:100%;
            position:absolute;
            bottom:90%;
            left:1.5px;
            border-radius:0;
        }

        input {
            width:calc(100% - 15px);
            border:0;
            padding:0;
            margin-left:15px;
            font-size:.8rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            padding-bottom:5px;

            &:focus {
                outline-style:none;
            }
        }
    }
`;

State.init({
  locations: [
    "Possible location 1",
    "Possible location 2",
    "Possible location 3",
    "Possible location 4",
    "Possible location 5",
  ],
  location: "",
  city: "",
});

const clean = (index) => {
  let locations = state.locations;
  locations[index] = "";
  State.update({ locations: locations });
};

const search = (val) => {};

return (
  <CreateQuest>
    <h1>Create a Quête:</h1>

    <div className="form-group">
      <input id="name" type="text" placeholder="Quête name" required />
      <label for="name">Quête name</label>
    </div>

    <div className="form-group">
      <textarea
        id="description"
        type="text"
        placeholder="Description"
        rows="6"
        required
        className="description form-control"
      />
      <label for="description">Description</label>
    </div>

    <div className="form-group">
      <input id="eth" type="number" placeholder="ETH" />
      <label className="eth-label" for="eth">
        ETH
      </label>
    </div>

    <div className="form-group">
      <input id="people" type="number" placeholder="Max. amount of Explorers" />
      <label for="people">Max. amount of Explorers</label>
    </div>

    <div className="form-group">
      <input
        id="city"
        type="text"
        placeholder="City"
        value={state.city}
        onChange={() => search()}
      />
      <ul>
        <li>Paris</li>
      </ul>
    </div>

    {state.city && (
      <LocationList className="form-group">
        {state.locations.map((val, idx) => (
          <div className="location-wrapper">
            <input
              type="text"
              value={state.locations[idx]}
              onClick={() => clean(idx)}
            />
          </div>
        ))}
      </LocationList>
    )}

    <button>Create Quest</button>
  </CreateQuest>
);

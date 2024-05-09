const StyledInput = styled.div`
    .form {
        --tw-text-opacity: 1;
        color: rgb(156 163 175 / var(--tw-text-opacity));
        padding: 0.5rem;

        label {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }

        .flex {
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            display: flex;

            input {
                outline: 2px solid transparent;
                outline-offset: 2px;
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity));
                font-size: 1rem;
                line-height: 1.5rem;
                padding: 1rem;
                background-color: transparent;
                border-style: none;
                flex: 1 1 0%;
                -webkit-appearance: textfield;
                font-family: inherit;
                font-weight: inherit;
            }
        }
    }
`;

const [value, setValue] = useState("");

// Update the value of the input
function updateInput(e) {
  setValue(e.target.value);
}

return (
  <StyledInput>
    <div autocomplete="off" className="form">
      <label for="search-field" className="">
        Search all files
      </label>
      <div className="flex">
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          className="w-5 h-5 ml-4"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          name="search-field"
          autocomplete="off"
          id="search-field"
          className=""
          placeholder="Search"
          type="search"
          value={value}
          onChange={updateInput}
        />
      </div>
    </div>
  </StyledInput>
);

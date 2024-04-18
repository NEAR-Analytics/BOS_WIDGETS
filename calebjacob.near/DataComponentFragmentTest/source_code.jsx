return (
  <>
    <div>
      Child Div
      <p>
        Child Div {`>`} P
        <button>
          Child Div {`>`} P {`>`} Button
        </button>
      </p>
    </div>

    <div>
      Sibling Div
      <p>
        Sibling Child Div {`>`} P
        <button>
          Sibling Child Div {`>`} P {`>`} Button
        </button>
      </p>
    </div>
  </>
);

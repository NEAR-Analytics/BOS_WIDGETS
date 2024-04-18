return (
  <>
    <div>
      Child Div
      <p>
        Child Div {`>`} P
        <Button>
          Child Div {`>`} P {`>`} Button
        </Button>
      </p>
    </div>

    <div>
      Sibling Div
      <p>
        Sibling Child Div {`>`} P
        <Button>
          Sibling Child Div {`>`} P {`>`} Button
        </Button>
      </p>
    </div>
  </>
);

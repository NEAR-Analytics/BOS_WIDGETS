interface Props {
  message: string;
}

export function BWEComponent(props: Props) {
  return (
    <div className="wrapper">
      <h2>BOS Says:</h2>
      <p>{props.message}</p>
    </div>
  );
}
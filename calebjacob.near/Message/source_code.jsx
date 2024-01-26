interface Props {
  message: string;
}

export function BWEComponent(props: Props) {
  return (
    <div>
      <h2>BOS Says:</h2>
      <p>{props.message}</p>
    </div>
  );
}
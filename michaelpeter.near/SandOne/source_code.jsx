interface Props {
  message?: string;
}

export function BWEComponent({ message = "Hello"}: Props) {
  return (
    <div>
      <p>Sandbox test</p>
    </div>
  );
}
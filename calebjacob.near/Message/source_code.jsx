type Props = {
  message: string;
};

function Message({ message }: Props) {
  return (
    <div className="wrapper">
      <h2>BOS Says:</h2>
      <p>{message}</p>
    </div>
  );
}

export default Message as BWEComponent<Props>;

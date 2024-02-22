import s from './styles.module.css';

type Props = {
  message?: string;
};

function MyComponent({ message = "Hello!" }: Props) {
  return (
    <div className={s.wrapper}>
      <p>{message}</p>
    </div>
  );
}

export default MyComponent as BWEComponent<Props>;

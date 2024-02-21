import s from './ModuleEntry.module.css'

type Props = {
  name: string;
  demoLink: string;
  note?: JSX.Element | string;
};


function ModuleEntry ({ name, demoLink, note }) {
  return (
    <li>
      <a className={s.link} key={name} href={demoLink}>
        {name}
      </a>
      {note ? <span>: {note}</span> : ''}
    </li>
  );
}

export default ModuleEntry as BWEComponent<Props>;
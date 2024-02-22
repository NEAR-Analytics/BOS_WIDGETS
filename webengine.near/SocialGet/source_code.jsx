import { socialDb } from '@bos-web-engine/social-db-plugin';
import { useState } from 'react';
import s from './styles.module.css';

function SocialGet () {
  const [data, setData] = useState('');

  const loadData = async () => {
    // TODO: Will be able to pass generic to socialDb.get() once import is fixed in sandbox

    const result = await socialDb.get({
      key: 'root.near/profile/**'
    });
    
    setData(JSON.stringify(result, null, 2));
  };

  return (
    <div className={s.wrapper}>
      <button onClick={loadData}>Fetch Example Profile Data</button>
      <p className={s.data}>{data}</p>
    </div>
  );
}

export default SocialGet as BWEComponent;

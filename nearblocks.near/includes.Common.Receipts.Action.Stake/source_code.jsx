import { shortenHex } from '@/includes/formats';
import FaCoins from '@/includes/icons/FaCoins';
import { yoctoToNear } from '@/includes/libs';


const Stake = (props) => {
  const { t, args } = props;

  return (
    <div className="py-1">
      <FaCoins className="inline-flex text-yellow-500 mr-1" />
      {t ? t('txns:txn.actions.stake.0') : 'Staked'}
      <span className="font-bold">
        {args.stake ? yoctoToNear(args.stake, true) : args.stake ?? ''}Ⓝ
      </span>{' '}
      {t ? t('txns:txn.actions.stake.1') : 'with'} {shortenHex(args.public_key)}
    </div>
  );
};

export default Stake;

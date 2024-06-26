import WrapDeposit from '@/includes/Common/Action/Wrap/WrapDeposit';
import Withdraw from '@/includes/Common/Action/Wrap/Withdraw';


const WrapContract = (props) => {
  switch (true) {
    case /^Deposit.*/.test(props.event.logs):
      return (
        <WrapDeposit
          event={props.event}
          network={props.network}
          ownerId={props.ownerId}
        />
      );
    case /^Withdraw.*/.test(props.event.logs):
      return (
        <Withdraw
          event={props.event}
          network={props.network}
          ownerId={props.ownerId}
        />
      );

    default:
      return null;
  }
};

export default WrapContract;

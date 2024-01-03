import Swap from '@/includes/Common/Action/Ref/Swap';


const RefContract = (props) => {
  switch (true) {
    case /^Swapped.*/.test(props.event.logs):
      return <Swap event={props.event} network={props.network} />;

    default:
      return null;
  }
};

export default RefContract;

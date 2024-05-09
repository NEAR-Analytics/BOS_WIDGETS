import Swap from '@/includes/Common/Action/Ref/Swap';


const RefContract = (props) => {
  return (
    <Swap event={props.event} network={props.network} ownerId={props.ownerId} />
  );
};

export default RefContract;

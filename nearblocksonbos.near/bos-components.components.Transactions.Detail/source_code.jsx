/**
 * Component: TransactionsDetail
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of specific Transaction on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {boolean} [loading] - Indicates whether data is currently loading.
 * @param {TransactionInfo} [txn] - Information related to a transaction.
 * @param {RPCTransactionInfo} [rpcTxn] - RPC data of the transaction.
 * @param {string} ownerId - The identifier of the owner of the component.
 */










/* INCLUDE COMPONENT: "includes/Common/Action/index.jsx" */
const WrapDeposit = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };

  const log = props.event.logs?.match(/^Deposit (\d+) NEAR to ([\S]+)/);

  if (log?.length !== 3) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Mint </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: props.event.contract,
            amount: log[1],
            network: props.network,
            ownerId: props.ownerId,
          }}
        />
      }
    </div>
  );
};
const Withdraw = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };

  const log = props.event.logs?.match(/^Withdraw (\d+) NEAR from ([\S]+)/);

  if (log?.length !== 3) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Burn </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: props.event.contract,
            amount: log[1],
            network: props.network,
            ownerId: props.ownerId,
          }}
        />
      }
    </div>
  );
};


2;


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
const Swap = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event.logs?.match(
    /^Swapped (\d+) ([\S]+) for (\d+) ([\S]+)/,
  );
  if (!Array.isArray(log)) {
    return null;
  }

  if (log?.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Swap </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            network: props.network,
            contract: log[2],
            amount: log[1],
            ownerId: props.ownerId,
          }}
        />
      }
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            network: props.network,
            contract: log[4].replace(/,$/, ''),
            amount: log[3],
            ownerId: props.ownerId,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        On{' '}
        <a href="/address/v2.ref-finance.near" className="hover:no-underline">
          <a className="text-green-500 font-normal hover:no-underline">
            Ref Finance
          </a>
        </a>
      </span>
    </div>
  );
};


const RefContract = (props) => {
  return (
    <Swap event={props.event} network={props.network} ownerId={props.ownerId} />
  );
};

const DepositToReserve = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Deposit To Reserve </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
const Deposit = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Deposit </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
const WithdrawSucceeded = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const log = props.event?.[0];
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Withdraw </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            network: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        To{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
const IncreaseCollateral = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Increase Collateral </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
const DescreaseCollateral = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Descrease Collateral </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
const Borrow = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };

  const log = props.event?.[0];

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Borrow </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        To{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
const Repay = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Repay </span>
      {
        <Widget
          src={`${props.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};







const BurrowContract = (props) => {
  let parsedEvent = {};

  try {
    parsedEvent = JSON.parse(props.event.logs.replace('EVENT_JSON:', ''));
  } catch (error) {
    console.log(error);
  }

  if ('event' in parsedEvent) {
    switch (parsedEvent.event) {
      case 'deposit_to_reserve':
        return (
          <DepositToReserve
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      case 'deposit':
        return (
          <Deposit
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      case 'withdraw_succeeded':
        return (
          <WithdrawSucceeded
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      case 'increase_collateral':
        return (
          <IncreaseCollateral
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      case 'decrease_collateral':
        return (
          <DescreaseCollateral
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      case 'borrow':
        return (
          <Borrow
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      case 'repay':
        return (
          <Repay
            event={parsedEvent.data}
            network={props.network}
            ownerId={props.ownerId}
          />
        );
      default:
        return null;
    }
  }

  return null;
};

const EventLogs = (props) => {
  switch (props.event.contract) {
    case 'wrap.near':
    case 'wrap.testnet':
      return (
        <WrapContract
          event={props.event}
          network={props.network}
          ownerId={props.ownerId}
        />
      );
    case 'v2.ref-finance.near':
      return (
        <RefContract
          event={props.event}
          network={props.network}
          ownerId={props.ownerId}
        />
      );
    case 'contract.main.burrow.near':
    case 'contract.1638481328.burrow.testnet':
      return (
        <BurrowContract
          event={props.event}
          network={props.network}
          ownerId={props.ownerId}
        />
      );
    default:
      return null;
  }
};/* END_INCLUDE COMPONENT: "includes/Common/Action/index.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Actions.jsx" */
const CreateAccount = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Create Account{' '}
        <a href={`/address/${props.action.to}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};
const DeleteAccount = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Delete Account{' '}
        <a href={`/address/${props.action.to}`}>
          <a className="text-green-500 font-normal pl-1">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};
const DeployContract = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Deploy Contract{' '}
        <a href={`/address/${props.action.to}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};
const Stake = (props) => {
  const { yoctoToNear } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Stake{' '}
        <span className="font-normal pl-1">
          {yoctoToNear(props.action.args.stake, true)} Ⓝ
        </span>
      </span>
    </div>
  );
};
const Transfer = (props) => {
  const { shortenAddress, yoctoToNear } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Transfer{' '}
        <span className="font-normal pl-1">
          {yoctoToNear(props.action.args.deposit, true)} Ⓝ
        </span>
      </span>
      <span className="font-bold text-gray px-1">
        From{' '}
        <a
          href={`/address/${props.action.from}`}
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.from)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        To{' '}
        <a href={`/address/${props.action.to}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};

const Actions = (props) => {
  switch (props.action.action_kind) {
    case 'CreateAccount':
      return <CreateAccount action={props.action} ownerId={props.ownerId} />;
    case 'DeleteAccount':
      return <DeleteAccount action={props.action} ownerId={props.ownerId} />;
    case 'DeployContract':
      return <DeployContract action={props.action} ownerId={props.ownerId} />;
    case 'Stake':
      return <Stake action={props.action} ownerId={props.ownerId} />;
    case 'Transfer':
      return <Transfer action={props.action} ownerId={props.ownerId} />;
    default:
      return null;
  }
};/* END_INCLUDE COMPONENT: "includes/Common/Actions.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Question.jsx" */
const Question = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 011-1 1.5 1.5 0 10-1.471-1.794l-1.962-.393A3.501 3.501 0 1113 13.355z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Question.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Status.jsx" */
const FaCheckCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
        fill="#50C878"
      />
    </svg>
  );
};
const FaTimesCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
        fill="#ff0000"
      />
    </svg>
  );
};
const FaHourglassStart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
      <path
        d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V75c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32H64 320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V437c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320 64 32zM288 437v11H96V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9z"
        fill="#FFEB3B"
      />
    </svg>
  );
};

const getOptions = (status) => {
  switch (status) {
    case null:
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-500',
        icon: FaHourglassStart,
        label: 'Pending',
      };
    case false:
      return {
        bg: 'bg-red-50',
        text: 'text-red-500',
        icon: FaTimesCircle,
        label: 'Failure',
      };

    default:
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-500',
        icon: FaCheckCircle,
        label: 'Success',
      };
  }
};

const TxnStatus = (props) => {
  const option = getOptions(props.status);
  const Icon = option.icon;

  return (
    <div className="w-full md:w-3/4 break-words">
      <span
        className={`inline-flex items-center text-xs rounded py-1 ${
          option.bg
        } ${option.text} ${props.showLabel ? ' px-2' : ' px-1'}`}
      >
        <Icon />
        {props.showLabel && <span className="ml-2">{option.label}</span>}
      </span>
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Status.jsx" */
/* INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const ArrowDown = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/* INCLUDE COMPONENT: "includes/icons/ArrowUp.jsx" */
const ArrowUp = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowUp.jsx" */
/* INCLUDE COMPONENT: "includes/icons/FaRight.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const FaRight = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 192 512"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaRight.jsx" */
/* INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */
/**
 * @interface Props
 * @param {string} [src] - The URL string pointing to the image source.
 * @param {string} [alt] - The alternate text description for the image.
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 * @param {string} [appUrl] - The URL of the application.
 */










const TokenImage = ({
  appUrl,
  src,
  alt,
  className,
  onLoad,
  onSetSrc,
}) => {
  const placeholder = appUrl
    ? `${appUrl}images/tokenplaceholder.svg`
    : '/images/tokenplaceholder.svg';

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    if (onSetSrc) {
      onSetSrc(placeholder);
    }
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};/* END_INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */











function MainComponent(props) {
  const { loading, txn, network, t, rpcTxn, ownerId } = props;

  const {
    convertToMetricPrefix,
    convertToUTC,
    dollarFormat,
    gasPercentage,
    getTimeAgoString,
    localFormat,
    shortenToken,
    shortenTokenSymbol,
  } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  const {
    fiatValue,
    getConfig,
    handleRateLimit,
    nanoToMilli,
    shortenAddress,
    yoctoToNear,
  } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const { tokenAmount, txnActions, txnErrorMessage, txnLogs } = VM.require(
    `${ownerId}/widget/includes.Utils.near`,
  );

  const [isContract, setIsContract] = useState(false);
  const [statsData, setStatsData] = useState({} );
  const [price, setPrice] = useState('');
  const [more, setMore] = useState(false);

  const { fts, nfts } = useMemo(() => {
    function tokensTransfers(receipts) {
      let fts = [];
      let nfts = [];

      receipts &&
        receipts.forEach(
          (receipt) =>
            receipt?.fts?.forEach((ft) => {
              if (ft.ft_meta && ft.cause === 'TRANSFER') {
                if (ft.ft_meta && Number(ft.delta_amount) < 0) fts.push(ft);
              } else {
                if (ft.ft_meta) fts.push(ft);
              }
            }),
        );
      receipts &&
        receipts.forEach(
          (receipt) =>
            receipt?.nfts?.forEach((nft) => {
              if (
                nft.nft_meta &&
                nft.nft_token_meta &&
                nft.cause === 'TRANSFER'
              ) {
                if (
                  nft.nft_meta &&
                  nft.nft_token_meta &&
                  Number(nft.delta_amount) < 0
                )
                  nfts.push(nft);
              } else {
                if (nft.nft_meta && nft.nft_token_meta) nfts.push(nft);
              }
            }),
        );

      return {
        fts,
        nfts,
      };
    }

    if (txn?.receipts?.length) {
      return tokensTransfers(txn.receipts);
    }

    return { fts: [], nfts: [] };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txn]);

  function absoluteValue(number) {
    return new Big(number).abs().toString();
  }

  const config = getConfig ? getConfig(network) : '';

  useEffect(() => {
    function fetchStatsDatas() {
      if (txn) {
        asyncFetch(`${config.backendUrl}stats`)
          .then(
            (res




) => {
              const resp = res?.body?.stats?.[0];
              if (res.status === 200) {
                setStatsData(resp);
              } else {
                handleRateLimit(res, fetchStatsDatas);
              }
            },
          )
          .catch(() => {});
      }
    }

    if (config.backendUrl) {
      fetchStatsDatas();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txn, config.backendUrl]);

  const toggleContent = () => {
    setMore((prevState) => !prevState);
  };
  const currentPrice = statsData?.near_price || 0;

  const date = useMemo(() => {
    if (txn?.block_timestamp) {
      const timestamp = new Date(nanoToMilli(txn?.block_timestamp));
      function fetchPriceAtDate(date) {
        asyncFetch(`${config.backendUrl}stats/price?date=${date}`).then(
          (data




) => {
            const resp = data?.body?.stats[0];
            if (data.status === 200) {
              setPrice(resp?.near_price);
            } else {
              handleRateLimit(data, () => fetchPriceAtDate(date));
            }
          },
        );
      }
      const currentDate = new Date();
      const currentDay = currentDate.getUTCDate();
      const currentMonth = currentDate.getUTCMonth() + 1;
      const currentYear = currentDate.getUTCFullYear();

      const currentDt = `${currentYear}-${
        currentMonth < 10 ? '0' : ''
      }${currentMonth}-${currentDay < 10 ? '0' : ''}${currentDay}`;

      const day = timestamp.getUTCDate();
      const month = timestamp.getUTCMonth() + 1;
      const year = timestamp.getUTCFullYear();

      const blockDt = `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day}`;

      if (currentDt > blockDt) {
        fetchPriceAtDate(blockDt);

        return blockDt;
      }
    }
    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txn?.block_timestamp]);

  const [logs, actions, errorMessage] = useMemo(() => {
    if (rpcTxn) {
      return [
        txnLogs && txnLogs(rpcTxn),
        txnActions && txnActions(rpcTxn),
        txnErrorMessage && txnErrorMessage(rpcTxn),
      ];
    }
    return [[], [], undefined];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpcTxn]);

  const Loader = (props) => {
    return (
      <div
        className={`bg-gray-200 h-5 rounded shadow-sm animate-pulse ${props.className} ${props.wrapperClassName}`}
      ></div>
    );
  };

  useEffect(() => {
    if (txn?.receiver_account_id) {
      asyncFetch(`${config.backendUrl}account/${txn.receiver_account_id}`).then(
        (data




) => {
          const resp = data?.body?.account?.[0];
          setIsContract(resp?.code_hash !== '11111111111111111111111111111111');
        },
      );
    }
  }, [txn, config.backendUrl]);

  return (
    <div className="text-sm text-nearblue-600 divide-solid divide-gray-200 divide-y">
      <div className="text-sm text-nearblue-600">
        {network === 'testnet' && (
          <div className="flex flex-wrap p-4 text-red-500">
            {t
              ? t('txns:testnetNotice')
              : '[ This is a Testnet transaction only ]'}
          </div>
        )}

        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.hash.tooltip')
                    : 'Unique identifier (hash) of this transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.hash.text.0') : 'Txn Hash'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 font-semibold break-words">
              {txn?.transaction_hash ? txn?.transaction_hash : ''}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-start p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.status.tooltip')
                    : 'The status of the transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.status.text.0') : 'Status'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {txn?.outcomes?.status !== undefined && (
                <TxnStatus showLabel status={txn?.outcomes?.status} />
              )}
              {errorMessage && (
                <div className="text-xs bg-orange-50 my-2 rounded-md text-left px-2 py-1">
                  {errorMessage}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.block.tooltip')
                    : 'The number of the block in which the transaction was recorded.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.block.text.0') : 'Block Height'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-14" />
            </div>
          ) : txn ? (
            <div className="w-full md:w-3/4 font-semibold break-words">
              <Link
                href={`/blocks/${txn?.included_in_block_hash}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 hover:no-underline">
                  {txn?.block?.block_height
                    ? localFormat(txn?.block?.block_height)
                    : txn?.block?.block_height ?? ''}
                </a>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.timestamp.tooltip')
                    : 'Timestamp of when this transaction was submitted.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.timestamp.text.0') : 'Timestamp'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-sm" />
            </div>
          ) : txn ? (
            <div className="w-full md:w-3/4 break-words">
              {`${getTimeAgoString(
                nanoToMilli(txn?.block_timestamp),
              )} (${convertToUTC(
                nanoToMilli(txn?.block_timestamp),
                true,
              )} +UTC)`}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  The shard number in which the transaction was executed in
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Shard Number
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-sm" />
            </div>
          ) : txn ? (
            <div className="w-full md:w-3/4 break-words">{txn?.shard_id}</div>
          ) : (
            ''
          )}
        </div>
      </div>
      {((actions?.length > 0 &&
        actions.some((item) =>
          [
            'CreateAccount',
            'DeleteAccount',
            'DeployContract',
            'Stake',
            'Transfer',
          ].includes(item?.action_kind),
        )) ||
        (logs.length > 0 &&
          logs.some((item, i) => (
            <EventLogs
              key={i}
              event={item}
              network={network}
              ownerId={ownerId}
            />
          )))) && (
        <div id="action-row" className="bg-white text-sm text-nearblue-600">
          <div className="flex items-start flex-wrap p-4">
            <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 leading-7">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Question className="w-4 h-4 fill-current mr-1" />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                    align="start"
                    side="bottom"
                  >
                    Highlighted events of the transaction
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
              Transaction Actions
            </div>
            {loading ? (
              <div className="w-full md:w-3/4">
                <Loader wrapperClassName="flex w-full max-w-xl" />
              </div>
            ) : (
              <div className="w-full md:w-3/4">
                <ScrollArea.Root className="w-full h-full rounded overflow-hidden bg-white">
                  <ScrollArea.Viewport className="w-full h-full rounded">
                    <div
                      id="action-column"
                      className="max-h-[194px] break-words space-y-2"
                    >
                      {logs?.map((event, i) => (
                        <EventLogs
                          key={i}
                          event={event}
                          network={network}
                          ownerId={ownerId}
                        />
                      ))}
                      {actions?.map((action, i) => (
                        <Actions key={i} action={action} ownerId={ownerId} />
                      ))}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    orientation="vertical"
                  >
                    <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    orientation="horizontal"
                  >
                    <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner className="bg-neargray-50" />
                </ScrollArea.Root>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-white text-sm text-nearblue-600">
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.from.tooltip')
                    : 'Account that signed and sent the transaction'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.from.text.0') : 'From'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-all">
              <Link
                href={`/address/${txn?.signer_account_id}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 hover:no-underline">
                  {txn?.signer_account_id}
                </a>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.to.tooltip')
                    : 'Account receiving the transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {isContract
              ? 'Interacted With (To)'
              : t
              ? t('txns:txn.to.text.0')
              : 'To'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-all">
              <Link
                href={`/address/${txn?.receiver_account_id}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 hover:no-underline">
                  {txn?.receiver_account_id}
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      {(fts?.length > 0 || nfts?.length > 0) && (
        <div className="flex items-start flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 leading-7">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  List of tokens transferred in the transaction
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Tokens Transferred
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="relative w-full md:w-3/4">
              <ScrollArea.Root className="w-full h-full rounded overflow-hidden bg-white">
                <ScrollArea.Viewport className="w-full h-full rounded">
                  <div className="max-h-[302px] break-words space-y-3">
                    {fts?.map((ft) => (
                      <div
                        className="flex items-center flex-wrap break-all leading-7"
                        key={ft?.key}
                      >
                        <FaRight className="inline-flex text-gray-400 text-xs" />
                        {ft?.cause === 'MINT' ? (
                          <>
                            <div className="font-semibold text-gray px-1">
                              From{' '}
                              {ft?.involved_account_id ? (
                                <Link
                                  href={`/address/${ft?.involved_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                    {shortenAddress(
                                      ft?.involved_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                            <div className="font-semibold text-gray px-1">
                              To{' '}
                              {ft?.affected_account_id ? (
                                <Link
                                  href={`/address/${ft?.affected_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1">
                                    {shortenAddress(
                                      ft?.affected_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-gray px-1">
                              From{' '}
                              {ft?.affected_account_id ? (
                                <Link
                                  href={`/address/${ft?.affected_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                    {shortenAddress(
                                      ft?.affected_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                            <div className="font-semibold text-gray px-1">
                              To{' '}
                              {ft?.involved_account_id ? (
                                <Link
                                  href={`/address/${ft?.involved_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1">
                                    {shortenAddress(
                                      ft?.involved_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                          </>
                        )}
                        <div className="font-semibold text-gray px-1">
                          For{' '}
                          <span className="pl-1 font-normal">
                            {ft?.delta_amount &&
                            ft?.ft_meta?.decimals &&
                            tokenAmount
                              ? tokenAmount(
                                  absoluteValue(ft?.delta_amount),
                                  ft?.ft_meta?.decimals,
                                  true,
                                )
                              : ''}
                          </span>
                        </div>
                        <Link
                          href={`/token/${ft?.ft_meta?.contract}`}
                          className="hover:no-underline"
                        >
                          <a className="text-green flex items-center hover:no-underline">
                            <TokenImage
                              src={ft?.ft_meta?.icon}
                              alt={ft?.ft_meta?.name}
                              appUrl={config?.appUrl}
                              className="w-4 h-4 mx-1"
                            />
                            {shortenToken(ft?.ft_meta?.name ?? '')}
                            <span>
                              &nbsp;(
                              {shortenTokenSymbol(ft?.ft_meta?.symbol ?? '')})
                            </span>
                          </a>
                        </Link>
                      </div>
                    ))}
                    {nfts?.map((nft) => (
                      <div className="flex" key={nft?.key}>
                        <div className="flex justify-start items-start">
                          <FaRight className="inline-flex text-gray-400 text-xs mt-1" />
                          <div className="flex flex-wrap">
                            <div>
                              <div className="sm:flex">
                                {nft?.cause === 'MINT' ? (
                                  <>
                                    <div className="font-semibold text-gray px-1">
                                      From{' '}
                                      {nft?.involved_account_id ? (
                                        <Link
                                          href={`/address/${nft?.involved_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.involved_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                    <div className="font-semibold text-gray px-1">
                                      To{' '}
                                      {nft?.affected_account_id ? (
                                        <Link
                                          href={`/address/${nft?.affected_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.affected_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="font-semibold text-gray px-1">
                                      From{' '}
                                      {nft?.affected_account_id ? (
                                        <Link
                                          href={`/address/${nft?.affected_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.affected_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                    <div className="font-semibold text-gray px-1">
                                      To{' '}
                                      {nft?.involved_account_id ? (
                                        <Link
                                          href={`/address/${nft?.involved_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.involved_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="sm:flex mt-1">
                                <div className="text-gray px-1">
                                  <span className="text-gray-400">For </span>
                                  <span className="pl-1 font-normal">
                                    NFT Token ID [
                                    <Link
                                      href={`/nft-token/${nft?.nft_meta?.contract}/${nft?.token_id}`}
                                      className="hover:no-underline"
                                    >
                                      <a className="text-green hover:no-underline">
                                        {shortenToken(nft?.token_id ?? '')}
                                      </a>
                                    </Link>
                                    ]
                                  </span>
                                </div>
                                <Link
                                  href={`/nft-token/${nft?.nft_meta?.contract}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green flex items-center hover:no-underline">
                                    <TokenImage
                                      src={nft?.nft_meta?.icon}
                                      alt={nft?.nft_meta?.name}
                                      appUrl={config?.appUrl}
                                      className="w-4 h-4 mx-1"
                                    />
                                    {shortenToken(nft?.nft_meta?.name ?? '')}
                                    <span>
                                      &nbsp;
                                      {`(${shortenTokenSymbol(
                                        nft?.nft_meta?.symbol ?? '',
                                      )})`}
                                    </span>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <div className="border rounded ml-2 w-11 h-11 p-1">
                              <Link
                                href={`/nft-token/${nft?.nft_meta?.contract}/${nft?.token_id}`}
                                className="hover:no-underline"
                              >
                                <a>
                                  {
                                    <Widget
                                      src={`${ownerId}/widget/bos-components.components.Shared.NFTImage`}
                                      props={{
                                        base: nft?.nft_meta?.base_uri,
                                        media: nft?.nft_token_meta?.media,
                                        reference:
                                          nft?.nft_meta?.reference ||
                                          nft?.nft_token_meta?.reference,
                                        alt: nft?.nft_token_meta?.title,
                                        className: 'max-h-full rounded',
                                        network: network,
                                        ownerId,
                                      }}
                                    />
                                  }
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-neargray-50" />
              </ScrollArea.Root>
            </div>
          )}
        </div>
      )}
      <div className="bg-white text-sm text-nearblue-600">
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.deposit.tooltip')
                    : 'Sum of all NEAR tokens transferred from the Signing account to the Receiver account. This includes tokens sent in a Transfer action(s), and as deposits on Function Call action(s).'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.deposit.text.0') : 'Deposit Value'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xs" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span>
                      {txn.actions_agg?.deposit
                        ? yoctoToNear(txn.actions_agg?.deposit, true)
                        : txn.actions_agg?.deposit ?? ''}{' '}
                      Ⓝ
                      {currentPrice && network === 'mainnet'
                        ? ` ($${fiatValue(
                            yoctoToNear(txn.actions_agg?.deposit ?? 0, false),
                            currentPrice,
                          )})`
                        : ''}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                    align="start"
                    side="bottom"
                  >
                    {t
                      ? t('txns:txn.deposit.tooltip')
                      : 'Sum of all NEAR tokens transferred from the Signing account to the Receiver account. This includes tokens sent in a Transfer action(s), and as deposits on Function Call action(s).'}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Question className="w-4 h-4 fill-current mr-1" />
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.fee.tooltip')
                    : 'Total fee paid in NEAR to execute this transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.fee.text.0') : 'Transaction fee'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xs" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {txn?.outcomes_agg?.transaction_fee
                ? yoctoToNear(txn?.outcomes_agg?.transaction_fee, true)
                : txn?.outcomes_agg?.transaction_fee ?? ''}{' '}
              Ⓝ
              {currentPrice && network === 'mainnet'
                ? ` ($${fiatValue(
                    yoctoToNear(txn.outcomes_agg?.transaction_fee ?? 0, false),
                    currentPrice,
                  )})`
                : ''}
            </div>
          )}
        </div>
      </div>
      {network === 'mainnet' && date && (
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Question className="w-4 h-4 fill-current mr-1" />
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.price.tooltip')
                    : 'Closing price of Ⓝ on date of transaction'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.price.text.0') : 'Ⓝ Price'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-32" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {price ? `$${dollarFormat(price)} / Ⓝ` : 'N/A'}
            </div>
          )}
        </div>
      )}

      <Accordion.Root
        type="single"
        className="text-sm text-nearblue-600 divide-solid divide-gray-200 divide-y border-b"
        defaultValue={more ? 'item-1' : undefined}
        collapsible
      >
        <Accordion.Item value="item-1">
          <Accordion.Header data-orientation="vertical">
            <div className="flex flex-wrap p-4">
              <Accordion.Trigger asChild onClick={toggleContent}>
                {!more ? (
                  <span className="text-green-500 flex items-center cursor-pointer">
                    Click to see more <ArrowDown className="fill-current" />
                  </span>
                ) : (
                  <span className="text-green-500 flex items-center cursor-pointer">
                    Click to see less <ArrowUp className="fill-current" />
                  </span>
                )}
              </Accordion.Trigger>
            </div>
          </Accordion.Header>
          <Accordion.Content>
            <div>
              <div className="flex flex-wrap p-4">
                <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                        align="start"
                        side="bottom"
                      >
                        {t
                          ? t('txns:txn.gas.tooltip')
                          : 'Maximum amount of gas allocated for the transaction & the amount eventually used.'}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  {t ? t('txns:txn.gas.text.0') : 'Gas Limit & Usage by Txn'}
                </div>
                {loading ? (
                  <div className="w-full md:w-3/4">
                    <Loader wrapperClassName="flex w-full max-w-xs" />
                  </div>
                ) : (
                  <div className="w-full md:w-3/4 break-words">
                    {convertToMetricPrefix(
                      txn?.actions_agg?.gas_attached ?? 0,
                    ) + 'gas'}
                    <span className="text-gray-300 px-1">|</span>
                    {convertToMetricPrefix(txn?.outcomes_agg?.gas_used ?? 0)}gas
                    (
                    {gasPercentage(
                      txn?.outcomes_agg?.gas_used ?? 0,
                      txn?.actions_agg?.gas_attached ?? 0,
                    )}
                    )
                  </div>
                )}
              </div>
              <div className="flex flex-wrap p-4">
                <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                        align="start"
                        side="bottom"
                      >
                        {t
                          ? t('txns:txn.burnt.tooltip')
                          : 'Total amount of Gas & Token burnt from this transaction.'}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  {t ? t('txns:txn.burnt.text.0') : 'Burnt Gas & Tokens by Txn'}
                </div>
                {loading ? (
                  <div className="w-full md:w-3/4">
                    <Loader wrapperClassName="flex w-full max-w-xs" />
                  </div>
                ) : (
                  <div className="w-full  text-xs items-center flex md:w-3/4 break-words">
                    <div className="bg-orange-50 rounded-md px-2 py-1">
                      <span className="text-xs mr-2">🔥</span>
                      {convertToMetricPrefix(
                        txn.receipt_conversion_gas_burnt ?? 0,
                      ) + 'gas'}
                      <span className="text-gray-300 px-1">|</span>{' '}
                      {txn.receipt_conversion_tokens_burnt
                        ? yoctoToNear(txn.receipt_conversion_tokens_burnt, true)
                        : txn.receipt_conversion_tokens_burnt ?? ''}{' '}
                      Ⓝ
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

return MainComponent(props, context);
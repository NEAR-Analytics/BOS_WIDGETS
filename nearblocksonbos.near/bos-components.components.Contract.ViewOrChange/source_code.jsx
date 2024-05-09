/**
 * Component: ContractViewOrChange
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Contract on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The account identifier passed as a string.
 * @param {boolean} [connected] - Boolean indicating whether the user is currently signed in or not.
 * @param {number} [index] - The position index of the contract method.
 * @param {string} [method] - Specifies the method name for the contract.
 * @param {string} [accountId] - The account ID of the signed-in user, passed as a string.
 * @param {string} ownerId - The identifier of the owner of the component.
 */











/* INCLUDE COMPONENT: "includes/icons/ArrowRight.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const ArrowRight = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={20}
      height={20}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
      />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowRight.jsx" */
/* INCLUDE COMPONENT: "includes/icons/CloseCircle.jsx" */
const CloseCircle = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick('All');
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      className={props.className}
      onClick={handleClick}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/CloseCircle.jsx" */
/* INCLUDE COMPONENT: "includes/icons/Question.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





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
};/* END_INCLUDE COMPONENT: "includes/icons/Question.jsx" */


const inputTypes = ['string', 'number', 'boolean', 'null', 'json'];

function MainComponent(props) {
  const { network, id, index, method, connected, accountId, ownerId } = props;
  const { capitalize, toSnakeCase } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit, isJson, mapFeilds, uniqueId } =
    VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const field = () => ({
    id: uniqueId(),
    name: '',
    type: '',
    value: '',
    placeholder: '',
  });

  const sortFields = (fields) => {
    fields.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });

    return fields;
  };

  const getDataType = (data) => {
    if (isJson(data)) {
      return 'json';
    }

    return isNaN(Number(data)) ? typeof data : 'number';
  };

  const [txn, setTxn] = useState(null);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hideQuery, setHideQuery] = useState(false);
  const [options, setOptions] = useState({
    attachedDeposit: '0',
    gas: '30000000000000',
  });

  const config = getConfig && getConfig(network);

  const onAdd = () => setFields((flds) => [...flds, field()]);

  const onRemove = (id) => () => {
    setFields((flds) =>
      sortFields(flds.filter((fld) => fld.id !== id)),
    );
  };

  const onChange = (
    e,
    type,
    id,
  ) => {
    setFields((flds) => {
      const curFeild = flds.find((fld) => fld.id === id);
      if (curFeild) {
        const name = type;
        const value = e.target.value;
        const rest = flds.filter((fld) => fld.id !== id);

        return sortFields([...rest, { ...curFeild, [name]: value }]);
      }

      return sortFields(flds);
    });
  };

  const onOptionChange =
    (key) =>
    (e) =>
      setOptions((optns) => ({ ...optns, [key]: e.target.value }));

  const onRead = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const args = mapFeilds(fields) ?? {};
      Near.asyncView(id, toSnakeCase(method), args)
        .then((resp) => {
          setError(null);
          setTxn(resp?.transaction_outcome?.id);
          setResult(JSON.stringify(resp, null, 2));
        })
        .catch((error) => {
          console.log(error);
          setTxn(null);
          setError(error?.message);
          setResult(null);
        });
    } catch (error) {
      setTxn(null);
      setError(error);
      setResult(null);
    }

    setLoading(false);
  };

  const onWrite = (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!accountId) throw new Error('Error in wallet connection');

      const args = mapFeilds(fields) ?? {};
      const res =
        Near.call(id, toSnakeCase(method), args);
      setError(null);
      setTxn(res?.transaction_outcome?.id);
      setResult(JSON.stringify(res, null, 2));
    } catch (error) {
      setTxn(null);
      setError(error);
      setResult(null);
    }

    setLoading(false);
  };

  const onDetect = (e) => {
    e.preventDefault();

    setLoading(true);
    setFields([]);

    try {
      asyncFetch(`${config?.backendUrl}account/${id}/contract/${method}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data






) => {
            const resp = data?.body?.action;
            if (data.status === 200) {
              const args = resp?.[0]?.args || {};
              const argJson = args?.args_json || {};

              setOptions((optns) => ({
                attachedDeposit: args?.deposit || optns.attachedDeposit,
                gas: args?.gas || optns.gas,
              }));

              argJson &&
                Object.entries(argJson).forEach(([arg, value]) => {
                  if (value) {
                    const type = getDataType(value);
                    const field = {
                      id: uniqueId(),
                      name: arg,
                      type: type,
                      value: '',
                      placeholder:
                        type === 'number'
                          ? value
                          : typeof value === 'object'
                          ? JSON.stringify(value)
                          : value,
                    };
                    setFields((flds) => [...flds, field]);
                    setHideQuery(true);
                  }
                });
              setLoading(false);
            } else {
              handleRateLimit(
                data,
                () => onDetect(e),
                () => setLoading(false),
              );
            }
          },
        )
        .catch(() => {});
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Accordion.Item
      value={index + 1}
      className="flex flex-col text-sm mb-3"
      key={index}
    >
      <Accordion.Header>
        <Accordion.Trigger className="bg-gray-50 dark:bg-black-200/50 dark:border-black-200 border rounded flex items-center justify-between px-4 py-2 w-full">
          <span>
            <span className="text-gray-400">{index + 1}.</span>{' '}
            {toSnakeCase(method ?? '')}
          </span>
          <ArrowRight className="contract-icon fill-gray-600" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="border dark:border-black-200 p-4 rounded slide-up slide-down">
        <div className="flex max-w-xl justify-between mb-3">
          <div className="flex items-center">
            Arguments
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span>
                    <Question className="w-4 h-4 fill-current ml-1" />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 ml-2"
                  align="start"
                  side="bottom"
                >
                  Specify an arguments schema.
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <button
            onClick={onAdd}
            className="mx-3 px-3 mr-1 bg-green dark:bg-green-250 dark:text-black py-1 text-xs font-medium rounded-md text-white"
          >
            Add
          </button>
          <button
            type="submit"
            onClick={(e) => onDetect(e)}
            disabled={loading}
            className="flex ml-2 mr-1 bg-green-500 dark:bg-green-250 dark:text-black hover:bg-green-400 text-white text-xs px-3 py-1.5 rounded focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Auto detect
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span>
                    <Question className="w-4 h-4 fill-current ml-1" />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 ml-2"
                  align="start"
                  side="bottom"
                >
                  Scan the blockchain to find successful method calls and copy
                  the parameter schema. Auto-detect might not work on every
                  method.
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </button>
        </div>
        {fields.map((field) => (
          <div key={field.id} className="flex max-w-xl items-center">
            <div className="sm:grid grid-cols-9 gap-2">
              <input
                name="name"
                value={field.name}
                onChange={(e) => onChange(e, 'name', field.id)}
                placeholder="Argument name"
                className="col-span-3 block border dark:border-black-200 rounded mb-3 h-9 px-3 w-full outline-none"
              />
              <select
                name="type"
                value={field.type}
                onChange={(e) => onChange(e, 'type', field.id)}
                className="col-span-2 bg-white block border  dark:border-black-200 rounded mb-3 h-9 px-3 w-full outline-none"
              >
                <option value="" disabled>
                  Type
                </option>
                {inputTypes.map((type) => (
                  <option value={type} key={type}>
                    {capitalize(type)}
                  </option>
                ))}
              </select>
              <input
                name="value"
                value={field.value}
                onChange={(e) => onChange(e, 'value', field.id)}
                placeholder={field.placeholder || 'Argument value'}
                className="col-span-4 block border dark:border-black-200 rounded mb-3 h-9 px-3 w-full outline-none"
              />
            </div>
            <button
              onClick={onRemove(field.id)}
              className="ml-3 p-1 mr-1 bg-red-300 self-start mt-1.5 hover:bg-red-400 text-xs font-medium rounded-md text-white"
            >
              <CloseCircle className="text-white fill-white w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex max-w-xl justify-between mb-3">
          <div className="flex items-center">
            Options
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span>
                    <Question className="w-4 h-4 fill-current ml-1" />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 ml-2"
                  align="start"
                  side="bottom"
                >
                  Optional arguments for write operations.
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>
        <div className="slide-down disclosure">
          <div className="max-w-xl sm:grid grid-cols-2 gap-2">
            <label>
              <span className="text-gray-400 text-xs">Attached deposit</span>
              <input
                name="attachedDeposit"
                value={options.attachedDeposit}
                onChange={onOptionChange('attachedDeposit')}
                placeholder="Attached Deposit"
                className="block border dark:border-black-200 rounded my-1 h-9 px-3 w-full outline-none"
              />
            </label>
            <label>
              <span className="text-gray-400 text-xs">Gas</span>
              <input
                name="gas"
                value={options.gas}
                onChange={onOptionChange('gas')}
                placeholder="Gas"
                className="block border dark:border-black-200 rounded my-1 h-9 px-3 w-full outline-none"
              />
            </label>
          </div>
        </div>
        <div className="flex items-center mt-5">
          {!hideQuery && (
            <button
              type="submit"
              onClick={(e) => onRead(e)}
              disabled={loading}
              className="bg-green-500 dark:bg-green-250 hover:bg-green-400 text-white dark:text-black text-xs px-3 py-1.5 rounded focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Query
            </button>
          )}
          {!hideQuery && (
            <div className="flex items-center mx-4 text-gray-400">
              OR{' '}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span>
                      <Question className="w-4 h-4 fill-current ml-1" />
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 ml-2"
                    align="start"
                    side="bottom"
                  >
                    We cant differentiate read/write methods for this contract,
                    so you should choose the appropriate action
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          )}
          <button
            type="submit"
            onClick={(e) => onWrite(e)}
            disabled={loading || !connected}
            className="bg-green-500 hover:bg-green-400 text-white dark:text-black text-xs px-3 py-1.5 rounded focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Write
          </button>
        </div>
        {error && (
          <textarea
            readOnly
            rows={6}
            className="block appearance-none outline-none w-full border rounded-lg bg-red-50 border-red-100 p-3 mt-3 resize-y"
            value={error}
          />
        )}
        {txn && (
          <div className="block appearance-none outline-none w-full border rounded-lg bg-green-50 border-green-100 p-3 mt-3">
            View txn details:{' '}
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span className="truncate max-w-[120px] inline-block align-bottom text-green-500">
                    <Link href={`/txns/${txn}`} className="hover:no-underline">
                      <a className="text-green-500">{txn}</a>
                    </Link>
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 ml-2"
                  align="start"
                  side="bottom"
                >
                  {txn}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        )}
        {result && (
          <textarea
            readOnly
            rows={6}
            className="block appearance-none outline-none w-full border rounded-lg bg-green-50 border-green-100 p-3 mt-3 resize-y"
            value={result}
          />
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
}

return MainComponent(props, context);
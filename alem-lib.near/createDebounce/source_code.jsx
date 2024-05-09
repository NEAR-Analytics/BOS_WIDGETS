/**
 * Create a debounced method to obtain the data after the desired interval.
 *
 * Example of usage:
 * `
 * const { createDebounce } = VM.require('alem-lib.near/widget/createDebounce');
 * if (!createDebounce) return "";
 *
 * const [words, setWords] = useState('')
 * const onInputChange = createDebounce((event) => setWords(event.target.value), 1000);
 *
 * // This will be changed 1 sec after the user stops typing.
 * console.log(words);
 *
 * return <input onChange={onInputChange} type="text" />;
 * `
 *
 * @param cb Callback
 * @param timeout Timeout. Default is 1 sec.
 * @returns
 */
const createDebounce = (cb, timeout) => {
  let timer;
  const _timeout = timeout || 1000;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(args);
    }, _timeout);
  };
};

return {
  createDebounce,
};

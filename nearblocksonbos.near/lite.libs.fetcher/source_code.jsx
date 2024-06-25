const fetcher = () => {
  const retryFetch = (url, options) => {
    let attempts = 0;
    const retries = 3;
    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        asyncFetch(url, options)
          .then((response) => {
            if (response.ok) {
              return resolve(response);
            }
            return reject(response);
          })
          .catch(reject);
      });
    };
    const attemptRequest = () => {
      return makeRequest()
        .then((response) => response)
        .catch((error) => {
          if (attempts < retries) {
            attempts++;
            const delay = 1000 * Math.pow(2, attempts);
            return new Promise((resolve) => setTimeout(resolve, delay)).then(
              attemptRequest
            );
          } else {
            return Promise.reject(error);
          }
        });
    };
    return attemptRequest();
  };
  const rpcFetch = (url, method, params) => {
    const options = {
      body: JSON.stringify({
        id: "near",
        jsonrpc: "2.0",
        method,
        params,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    return new Promise((resolve, reject) => {
      retryFetch(url, options)
        .then((response) => {
          const body = response.body;
          if (body.result) {
            return resolve(body.result);
          }
          return reject(body.error);
        })
        .catch(reject);
    });
  };
  const apiFetch = (url) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return new Promise((resolve, reject) => {
      retryFetch(url, options)
        .then((response) => {
          resolve(response.body);
        })
        .catch(reject);
    });
  };
  return { apiFetch, retryFetch, rpcFetch };
};
return fetcher(props);

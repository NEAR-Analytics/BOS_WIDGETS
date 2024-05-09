// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';
import { connect, keyStores, WalletConnection } from 'near-api-js';

const App = () => {
  const [account, setAccount] = useState(null);

    useEffect(() => {
        async function initNear() {
              const near = await connect({
                      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
                              nodeUrl: 'https://rpc.testnet.near.org',
                                      networkId: 'testnet',
                                            });

                                                  const wallet = new WalletConnection(near);

                                                        if (wallet.isSignedIn()) {
                                                                setAccount(wallet.account());
                                                                      }
                                                                          }

                                                                              initNear();
                                                                                }, []);

                                                                                  return (
                                                                                      <div className="app">
                                                                                            <header>
                                                                                                    <h1>Your NEAR Portfolio</h1>
                                                                                                            {account && <p>Logged in as: {account.accountId}</p>}
                                                                                                                  </header>
                                                                                                                        {/* Add your portfolio sections and projects here */}
                                                                                                                            </div>
                                                                                                                              );
                                                                                                                              };

                                                                                                                              export default App;
                                                                                                                              
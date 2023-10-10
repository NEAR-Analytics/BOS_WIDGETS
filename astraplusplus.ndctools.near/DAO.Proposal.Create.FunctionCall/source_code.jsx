const accountId = props.accountId ?? context.accountId;
const contractId = props.contractId;
const onClose = props.onClose;
const daoId = props.daoId;
const isCongressDaoID = props.isCongressDaoID;
const registry = "registry.i-am-human.near";

const CoADaoId = "coa.gwg-testing.near";
const VotingBodyDaoId = "";
const TCDaoId = "tc.gwg-testing.near";
const HoMDaoId = "hom.gwg-testing.near";

if (!accountId) {
    return "Please connect your NEAR wallet :)";
}

function isEmpty(value) {
    return !value || value === "";
}

State.init({
    contractId: state.contractId,
    method_name: state.method_name,
    args: state.args || "{}",
    deposit: state.deposit || "0",
    gas: "200000000000000",
    error: undefined,
    receiver_id: null,
    description: null,
    powerType: null,
    member: null, // for dismiss and ban hook
    house: null, // for dismiss and ban hook
    accounts: null, // for unban hook
    memo: null, // for unban hook
    showReceiverAsOptions: false,
    disableReceiverField: false
});

// only for UI
const powerTypes =
    daoId === CoADaoId
        ? [
              {
                  text: "Veto House of Merit motion",
                  value: "Veto"
              },
              {
                  text: "Unban member previously banned",
                  value: "Unban"
              }
          ]
        : daoId === TCDaoId
        ? [
              {
                  text: "Dismiss member from an house",
                  value: "Dismiss"
              },
              {
                  text: "Ban member from an house",
                  value: "DismissAndBan"
              }
          ]
        : daoId === VotingBodyDaoId
        ? [] // TODO :  after VB contract is ready
        : [];

const fc_args = Buffer.from(state.args, "utf-8").toString("base64");

function isNearAddress(address) {
    const ACCOUNT_ID_REGEX =
        /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
    return (
        address.length >= 2 &&
        address.length <= 64 &&
        ACCOUNT_ID_REGEX.test(address)
    );
}

const handleFunctionCall = () => {
    if (!isCongressDaoID) {
        if (isEmpty(state.contractId) || !isNearAddress(state.contractId)) {
            State.update({
                error: "Please enter a valid contract ID"
            });
            return;
        }
    }
    if (state.powerType !== "Unban" || state.powerType !== "Ban") {
        if (isEmpty(state.method_name)) {
            State.update({
                error: "Please enter a valid method name"
            });
            return;
        }

        const is_valid_json = (str) => {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };

        if (isEmpty(state.args) || !is_valid_json(state.args)) {
            State.update({
                error: "Please enter a valid JSON arguments"
            });
            return;
        }
        if (isEmpty(state.deposit) || state.deposit < 0) {
            State.update({
                error: "Please enter a valid deposit"
            });
            return;
        }
        if (isEmpty(state.gas) || state.gas <= 0) {
            State.update({
                error: "Please enter a valid gas"
            });
            return;
        }
    }

    const deposit = Big(state.deposit).mul(Big(10).pow(24)).toFixed();

    if (isCongressDaoID) {
        let args = {};
        if (state.powerType === "Unban") {
            const accountsArray = state.accounts
                ?.split(",")
                .map((item) => item.trim());
            if (
                !accountsArray?.length ||
                accountsArray?.some((item) => !isNearAddress(item))
            ) {
                State.update({
                    error: "Please enter valid account IDs"
                });
                return;
            }
            args = {
                kind: {
                    FunctionCall: {
                        receiver_id: registry,
                        actions: [
                            {
                                method_name: "admin_unflag_accounts",
                                args: {
                                    accounts: accountsArray,
                                    memo: state.memo
                                },
                                deposit: deposit,
                                gas: state.gas
                            }
                        ]
                    }
                },
                description: state.description
            };
        } else {
            if (state.powerType === "DismissAndBan") {
                if (isEmpty(state.house) || !isNearAddress(state.house)) {
                    State.update({
                        error: "Please enter a valid house contract ID"
                    });
                    return;
                }
                if (isEmpty(state.member) || !isNearAddress(state.member)) {
                    State.update({
                        error: "Please enter a valid member ID"
                    });
                    return;
                }
                args = {
                    kind: {
                        DismissAndBan: {
                            member: state.member,
                            house: state.house
                        }
                    },
                    description: state.description
                };
            } else {
                if (
                    isEmpty(state.receiver_id) ||
                    !isNearAddress(state.receiver_id)
                ) {
                    State.update({
                        error: "Please enter a valid recipient address"
                    });
                    return;
                }
                if (isEmpty(state.description)) {
                    State.update({
                        error: "Please enter a description"
                    });
                    return;
                }

                args = {
                    kind: {
                        FunctionCall: {
                            receiver_id: state.receiver_id,
                            actions: [
                                {
                                    method_name: state.method_name,
                                    args: fc_args,
                                    deposit: deposit,
                                    gas: state.gas
                                }
                            ]
                        }
                    },
                    description: state.description
                };
            }

            Near.call([
                {
                    contractName: daoId,
                    methodName: "create_proposal",
                    args: args,
                    deposit: 100000000000000000000000,
                    gas: 200000000000000
                }
            ]);
        }
    } else {
        Near.call([
            {
                contractName: state.contractId,
                methodName: state.method_name,
                args: {
                    Arguments: fc_args
                },
                deposit: deposit,
                gas: state.gas ?? "200000000000000"
            }
        ]);
    }
};

const onChangeContract = (contractId) => {
    State.update({
        contractId,
        error: undefined
    });
};

const onChangeMethod = (method_name) => {
    State.update({
        method_name,
        error: undefined
    });
};

const onChangeArgs = (args) => {
    State.update({
        args,
        error: undefined
    });
};

const onChangeGas = (gas) => {
    State.update({
        gas,
        error: undefined
    });
};

const onChangeDeposit = (deposit) => {
    State.update({
        deposit,
        error: undefined
    });
};

const onChangeDescription = (description) => {
    State.update({
        description,
        error: undefined
    });
};

const onChangeRecipient = (receiver_id) => {
    State.update({
        receiver_id,
        error: undefined
    });
};

const onChangeHouse = (house) => {
    State.update({
        house,
        error: undefined
    });
};

const onChangeMember = (member) => {
    State.update({
        member,
        error: undefined
    });
};

const onChangeAccounts = (accounts) => {
    State.update({
        accounts,
        error: undefined
    });
};

const onChangeMemo = (memo) => {
    State.update({
        memo,
        error: undefined
    });
};

const onChangePowerType = (power) => {
    switch (power?.value) {
        case "Dismiss": {
            State.update({
                method_name: "dismiss_hook",
                args: JSON.stringify({
                    member: ""
                }),
                showReceiverAsOptions: true
            });
            break;
        }
        case "Veto": {
            State.update({
                method_name: "veto_hook",
                args: JSON.stringify({
                    id: ""
                }),
                receiver_id: HoMDaoId,
                disableReceiverField: true
            });
            break;
        }
        case "Ban": {
            break;
        }
        case "Unban": {
            State.update({
                accounts: null,
                memo: null
            });
            break;
        }
        case "DismissAndBan": {
            State.update({
                house: null,
                member: null
            });
            break;
        }
        default: {
            break;
        }
    }
};

const defaultDescription =
    "# [Your Title Here]\n\n## Description\n\n[Detailed description of what the proposal is about.]\n\n## Why This Proposal?\n\n[Explanation of why this proposal is necessary or beneficial.]\n\n## Execution Plan\n\n[Description of how the proposal will be implemented.]\n\n## Budget\n\n[If applicable, outline the budget required to execute this proposal.]\n\n## Timeline\n\n[Proposed timeline for the execution of the proposal.]";

return (
    <>
        {(daoId === CoADaoId || daoId === TCDaoId) && (
            <div className="mb-3">
                <Widget
                    src={`sking.near/widget/Common.Inputs.Select`}
                    props={{
                        label: "Power",
                        noLabel: false,
                        placeholder: "Can propose motion",
                        options: powerTypes,
                        value: state.powerType,
                        onChange: (powerType) => {
                            State.update({
                                ...state,
                                powerType: powerType.value
                            });
                            onChangePowerType(powerType);
                        },

                        error: undefined
                    }}
                />
            </div>
        )}

        {state.powerType === "DismissAndBan" ? (
            <>
                <div className="mb-3">
                    <h5>Member</h5>
                    <input
                        type="text"
                        value={state.member}
                        onChange={(e) => onChangeMember(e.target.value)}
                        placeholder="Specify member account"
                    />
                </div>
                <div className="mb-3">
                    <Widget
                        src={`sking.near/widget/Common.Inputs.Select`}
                        props={{
                            label: "House",
                            noLabel: false,
                            placeholder: "Select house account",
                            options: [
                                { text: CoADaoId, value: CoADaoId },
                                { text: HoMDaoId, value: HoMDaoId },
                                { text: TCDaoId, value: TCDaoId }
                            ],
                            value: state.house,
                            onChange: (house) => {
                                State.update({
                                    house: house.value,
                                    error: undefined
                                });
                            },

                            error: undefined
                        }}
                    />
                </div>
            </>
        ) : (
            <>
                {state.powerType === "Unban" ? (
                    <>
                        <div className="mb-3">
                            <h5>Accounts List (separated by comma)</h5>
                            <input
                                type="text"
                                value={state.accounts}
                                onChange={(e) =>
                                    onChangeAccounts(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <h5>Memo</h5>
                            <Widget
                                src="sking.near/widget/Common.Inputs.Markdown"
                                props={{
                                    value: state.memo,
                                    onChange: (value) => onChangeMemo(value),
                                    height: "270px",
                                    initialText: defaultDescription
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {!isCongressDaoID && (
                            <div className="mb-3">
                                <h5>Contract</h5>
                                <input
                                    type="text"
                                    value={state.contractId}
                                    onChange={(e) =>
                                        onChangeContract(e.target.value)
                                    }
                                />
                            </div>
                        )}
                        <div className="mb-3">
                            <h5>Method</h5>
                            <input
                                disabled={state.powerType && state.method_name}
                                type="text"
                                value={state.method_name}
                                onChange={(e) => onChangeMethod(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <h5>Arguments (JSON)</h5>
                            <textarea
                                type="text"
                                value={state.args}
                                onChange={(e) => onChangeArgs(e.target.value)}
                                className="form-control"
                                defaultValue={state.args}
                            />
                        </div>
                        {state.showReceiverAsOptions && (
                            <div className="mb-3">
                                <Widget
                                    src={`sking.near/widget/Common.Inputs.Select`}
                                    props={{
                                        label: "Recipient",
                                        noLabel: false,
                                        placeholder: "Select Recipient account",
                                        options: [
                                            { text: CoADaoId, value: CoADaoId },
                                            { text: HoMDaoId, value: HoMDaoId },
                                            { text: TCDaoId, value: TCDaoId }
                                        ],
                                        value: state.receiver_id,
                                        onChange: (house) => {
                                            State.update({
                                                receiver_id: house.value,
                                                error: undefined
                                            });
                                        },

                                        error: undefined
                                    }}
                                />
                            </div>
                        )}
                        {isCongressDaoID && !state.showReceiverAsOptions && (
                            <div className="mb-3">
                                <h5>Recipient</h5>
                                <input
                                    disabled={state.disableReceiverField}
                                    type="text"
                                    value={state.receiver_id}
                                    onChange={(e) =>
                                        onChangeRecipient(e.target.value)
                                    }
                                    placeholder="Specify target account"
                                />
                            </div>
                        )}
                    </>
                )}
                <div className="mb-3">
                    <h5>Deposit</h5>
                    <input
                        type="number"
                        value={state.deposit}
                        onChange={(e) => onChangeDeposit(e.target.value)}
                        defaultValue={0}
                    />
                </div>
                <div className="mb-3">
                    <h5>Gas</h5>
                    <input
                        type="number"
                        value={state.gas}
                        onChange={(e) => onChangeGas(e.target.value)}
                        defaultValue="200000000000000"
                    />
                </div>
            </>
        )}
        {isCongressDaoID && state.powerType !== "Unban" && (
            <div className="mb-3">
                <h5>Description</h5>
                <Widget
                    src="sking.near/widget/Common.Inputs.Markdown"
                    props={{
                        value: state.description,
                        onChange: (value) => onChangeDescription(value),
                        height: "270px",
                        initialText: defaultDescription
                    }}
                />
            </div>
        )}
        {state.error && <div className="text-danger">{state.error}</div>}
        <div className="ms-auto">
            <Widget
                src="sking.near/widget/Common.Button"
                props={{
                    children: "Propose Function Call",
                    onClick: handleFunctionCall,
                    className: "mt-2",
                    variant: "success"
                }}
            />
            {onClose && (
                <Widget
                    src="sking.near/widget/Common.Button"
                    props={{
                        children: "Close",
                        onClick: onClose,
                        className: "mt-2"
                    }}
                />
            )}
        </div>
    </>
);

const { router, house } = props;
const accountId = props.accountId ?? context.accountId ?? "";

const HOM_IMG =
    "https://ipfs.near.social/ipfs/bafkreifli7bprs5zpjh4bwuqtci5xaxjxqf3vfibqw7mxesdgetstkscla";
const COA_IMG =
    "https://ipfs.near.social/ipfs/bafkreigdst4dvxqn5dgwb2ey76lgljxpvahuoaxej5ivvdbiarliaj5u2a";
const TC_IMG =
    "https://ipfs.near.social/ipfs/bafkreibkeijjgzhqwd5nxgiy35gp3kmj2hopyjthzeul65gtv2dlc3z33u";
const VB_IMG =
    "https://ipfs.near.social/ipfs/bafkreidu5mlr6wsgkkziflt5cqamxwfmvofqrlzqtm3grxy535oaqlzlga";

const Content = {
    hom: {
        title: "House of Merit",
        abbr: "HoM",
        color: "#5BC65F",
        description:
            "The House of Merit is in charge of allocating the treasury and deploying capital for the growth of the ecosystem.",
        metadata: {
            members: 15,
            groups: 1,
            proposals: { active: 1, total: 4 },
            powers: [
                {
                    text: "The House of Merit can propose budget (Setup Package) provided that the budget is not vetoed by the Voting Body."
                },
                {
                    text: "The House of Merit can propose any motions provided that these motions are not vetoed by the Council of Advisors."
                }
            ],
            checks: [
                {
                    house: "coa",
                    text: "The Council of Advisors can veto any HoM proposals, except setup package, large budget items, and recurring budget items"
                },
                {
                    house: "vb",
                    text: "The Voting Body must rectify setup package, and can veto large budget items and recurring budget items."
                },
                {
                    house: "vb",
                    text: "The Voting Body can vote to dissolve the House of Merit."
                },
                {
                    house: "tc",
                    text: "The Transparency Commission can remove members of the House of Merit.",
                    description:
                        "The vote needs a simple majority. When 8 members from the House of Merit are removed, the house is dissolved and a new House of Merit is elected."
                }
            ]
        }
    },
    coa: {
        title: "Council of Advisors",
        abbr: "CoA",
        color: "#4498E0",
        description:
            "The Council of Advisors is in charge of vetoing proposals from the HoM and guiding the deployment of the treasury.",
        metadata: {
            members: 7,
            groups: 1,
            proposals: { active: 1, total: 4 },
            powers: [
                {
                    text: "All proposals originated from the House of Merit (except the Setup Package) can be vetoed by the Council of Advisors."
                },
                {
                    text: "Council of Advisors could reinstate banned members by the Transparency Commission."
                }
            ],
            checks: [
                {
                    house: "vb",
                    text: "The Voting Body can vote to dissolve the Council of Advisors."
                },
                {
                    house: "tc",
                    text: "The Transparency Commission can remove members of the Council of Advisors.",
                    description:
                        "The vote needs a simple majority. When 4 members from the Council of Advisors are removed, the house is dissolved and a new Council of Advisor is elected."
                }
            ]
        }
    },
    tc: {
        title: "Transparency Commission",
        abbr: "TC",
        color: "#F19D38",
        description:
            "The Transparency Commission is In charge of keeping behavior of elected officials clean, and making sure cartels do not form in the ecosystem.",
        metadata: {
            funds: "10M",
            members: 7,
            groups: 1,
            proposals: { active: 1, total: 4 },
            powers: [
                {
                    text: "The Transparency Commission can conduct investigations and make decisions on removal or retention of Congressional members."
                },
                {
                    text: "The Transparency Commission has the power to investigate, remove, and ban members of House of Merit. (Checks & Balances)."
                },
                {
                    text: "The Transparency Commission  has the power to investigate, remove, and ban members of Council of Advisors. (Checks & Balances)."
                },
                {
                    text: "The TC has the power to investigate, remove, and ban members of Transparency Commission. (Checks & Balances) "
                }
            ],
            checks: [
                {
                    house: "coa",
                    text: "The Council of Advisors can reinstate members removed by the Transparency Commission."
                },
                {
                    house: "vb",
                    text: "The Voting Body can vote to dissolve the Transparency Commission."
                },
                {
                    house: "tc",
                    text: "The Transparency Commission can remove members of the Transparency Commission.",
                    description:
                        "The vote needs a simple majority. When 4 members from the Transparency Commission are removed, the house is dissolved and a Transparency Commission is elected."
                }
            ]
        }
    },
    vb: {
        title: "Voting Body",
        abbr: "VB",
        color: "#F29BC0",
        description:
            "The Voting Body consists all fair voters who participated in the inaugural NDC elections and received a “I Voted” Soul Bound Token. ",
        metadata: {
            funds: "10M",
            members: 850,
            groups: 1,
            proposals: { active: 1, total: 4 },
            powers: [
                {
                    text: "The Voting Body must ratify Set Up Package. (Checks  & Balances)"
                },
                {
                    text: "The Voting Body may veto large budget items and recurring budget items. (Checks  & Balances)"
                },
                {
                    text: "The Voting Body may report activities to be investigated by the Transparency Commission."
                },
                {
                    text: "The Voting Body may vote to dissolve the House of Merit. (Checks  & Balances)"
                },
                {
                    text: "The Voting Body may vote to dissolve the Council of Advisors. (Checks  & Balances)"
                },
                {
                    text: "The Voting Body may vote to dissolve the Transparency Commission. (Checks  & Balances)"
                }
            ],
            checks: []
        }
    }
};

const Container = styled.div`
    background: rgba(217, 217, 217, 0.3);
    color: #464c50;
    font-size: 14px;
    line-height: 24px;

    h5,
    h6 {
        margin: 0;
    }
`;

const HousePanel = styled.div`
    width: 800px;
    background-color: #fff;
`;

const CircleLogo = styled.div`
    height: 65px;
    width: 65px;
    border-radius: 50%;
    border: 5px solid;
    background: black;
    color: white;
    text-transform: uppercase;
    border-color: ${Content[state.selectedHouse].color};
`;

const CircleLogoSmall = styled.div`
    height: 30px;
    min-width: 30px;
    border-radius: 50%;
    border: 2px solid;
    font-weight: 700;
    background: black;
    color: white;
    font-size: 11px;
    text-transform: uppercase;
    border-color: ${(props) => Content[props.house].color};
`;

const Tab = styled.div`
    padding: 6px 12px;
    gap: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 50px;
    background: ${(props) => (props.selected ? "#F4F4F4" : "transparent")};
    color: ${(props) => (props.selected ? "#000" : "inherit")};

    &:hover {
        cursor: pointer;
    }

    .circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #d4d4d4;
        padding: 4px;
    }
`;

const Section = styled.div`
    padding: 35px;
    padding-right: 0;
`;

const UserIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${(props) => props.color};
    padding-right: 1px;
`;

const Hr = styled.div`
    width: 1px;
    height: 25px;
    background: #d9d9d9;
`;

const Description = styled.div`
    line-height: 18px;
`;

const Tabs = styled.div`
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 0.4);
    background: rgba(217, 217, 217, 0.1);
    display: flex;
    padding: 20px 14px;
    gap: 20px;
`;

const Img = styled.img`
    width: 90%;
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;

    .dropdown-content {
        display: none;
        border-radius: 4px;
        position: absolute;
        right: -25px;
        top: 35px;
        background-color: #fff;
        min-width: 230px;
        z-index: 1;
        font-size: 14px;

        div,
        a {
            padding: 8px 12px;
            &:hover {
                background: #f8f9fa;
                cursor: pointer;
            }
        }
    }

    &:hover .dropdown-content {
        display: flex;
    }
`;

State.init({
    selectedHouse: house ?? "hom",
    selectedTab: "powers",
    copied: false,
    proposals: [],
    showChecksDescription: false
});

const ContentBlock = ({ title, abbr, address, description, metadata }) => (
    <Section className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex flex-column bg-white gap-3">
            <div className="d-flex justify-content-between">
                <CircleLogo className="d-flex justify-content-center align-items-center">
                    <h6>
                        <b>{abbr}</b>
                    </h6>
                </CircleLogo>

                <Dropdown className="mt-1 px-2">
                    <i class="bi bi-three-dots-vertical" />
                    <div class="flex-column dropdown-content shadow">
                        <a href="#/astraplusplus.ndctools.near/widget/home?page=proposals">
                            Proposals
                        </a>
                        <a href="#/astraplusplus.ndctools.near/widget/home?page=members">
                            Members
                        </a>
                    </div>
                </Dropdown>
            </div>
            <div>
                <div className="d-flex">
                    <h4>
                        <b>{title}</b>
                    </h4>
                    <Dropdown className="mt-1 px-2">
                        <i className="bi bi-caret-down-fill" />
                        <div class="flex-column dropdown-content shadow">
                            <a
                                onClick={() =>
                                    State.update({ selectedHouse: "hom" })
                                }
                                href="#/astraplusplus.ndctools.near/widget/home?page=congress&house=hom"
                            >
                                {Content.hom.title}
                            </a>
                            <a
                                onClick={() =>
                                    State.update({ selectedHouse: "coa" })
                                }
                                href="#/astraplusplus.ndctools.near/widget/home?page=congress&house=coa"
                            >
                                {Content.coa.title}
                            </a>
                            <a
                                onClick={() =>
                                    State.update({ selectedHouse: "tc" })
                                }
                                href="#/astraplusplus.ndctools.near/widget/home?page=congress&house=tc"
                            >
                                {Content.tc.title}
                            </a>
                            <a
                                onClick={() =>
                                    State.update({ selectedHouse: "vb" })
                                }
                                href="#/astraplusplus.ndctools.near/widget/home?page=congress&house=vb"
                            >
                                {Content.vb.title}
                            </a>
                        </div>
                    </Dropdown>
                </div>
                <span className="text-secondary">
                    <b id="address">{address}</b>
                </span>
                <i
                    className={state.copied ? "bi-check-lg" : "bi bi-clipboard"}
                    role="button"
                    onClick={() => {
                        clipboard
                            .writeText(address)
                            .then(() => State.update({ copied: true }));
                    }}
                />
            </div>
            <div>
                <span className="text-secondary">{description}</span>
            </div>
            <div className="d-flex justify-content-around my-4">
                <div className="text-center">
                    <h5 className="mb-0">
                        <b>
                            {metadata.members}/{metadata.groups}
                        </b>
                    </h5>
                    <span className="text-secondary">
                        <b>Members / Groups</b>
                    </span>
                </div>
                <div className="text-center">
                    <h5 className="mb-0">
                        <b>
                            {metadata.proposals.active}/
                            {metadata.proposals.total}
                        </b>
                    </h5>
                    <span className="text-secondary">
                        <b>Active / Total Proposals</b>
                    </span>
                </div>
            </div>
            <Tabs className="flex-column mb-4">
                <div className="d-flex justify-content-between gap-2">
                    <Tab
                        onClick={() => State.update({ selectedTab: "powers" })}
                        selected={state.selectedTab === "powers"}
                    >
                        <div>Powers</div>
                        <div className="circle d-flex justify-content-center align-items-center">
                            <div>{metadata.powers.length}</div>
                        </div>
                    </Tab>
                    <Tab
                        onClick={() => State.update({ selectedTab: "checks" })}
                        selected={state.selectedTab === "checks"}
                    >
                        <div>Checks on {Content[house].abbr}</div>
                        <div className="circle d-flex justify-content-center align-items-center">
                            <div>{metadata.checks.length}</div>
                        </div>
                    </Tab>
                    <Tab
                        onClick={() =>
                            State.update({ selectedTab: "proposals" })
                        }
                        selected={state.selectedTab === "proposals"}
                    >
                        <div>Proposals</div>
                        <div className="circle d-flex justify-content-center align-items-center">
                            <div>{state.proposals.length}</div>
                        </div>
                    </Tab>
                </div>
                <div className="d-flex flex-column gap-4 p-3">
                    {state.selectedTab === "powers" &&
                        metadata.powers.map((r) => (
                            <PowerDescription
                                color={Content[state.selectedHouse].color}
                                text={r.text}
                            />
                        ))}
                    {state.selectedTab === "checks" &&
                        metadata.checks.map((c) => (
                            <ChecksDescription
                                house={c.house}
                                text={c.text}
                                description={c.description}
                            />
                        ))}
                </div>
            </Tabs>
        </div>

        <div className="d-flex justify-content-end">
            <Widget
                src="astraplusplus.ndctools.near/widget/Common.Layout.CardModal"
                props={{
                    title: "Create Proposal",
                    onToggle: () =>
                        State.update({
                            isProposalModalOpen: !state.isProposalModalOpen
                        }),
                    isOpen: state.isProposalModalOpen,
                    toggle: (
                        <Widget
                            src="nearui.near/widget/Input.Button"
                            props={{
                                children: (
                                    <>
                                        Create Proposal
                                        <i className="bi bi-16 bi-plus-lg"></i>
                                    </>
                                ),
                                variant: "info"
                            }}
                        />
                    ),
                    content: (
                        <div
                            className="d-flex flex-column align-items-stretch"
                            style={{
                                width: "800px",
                                maxWidth: "100vw"
                            }}
                        >
                            <Widget
                                src={
                                    "astraplusplus.ndctools.near/widget/DAO.Proposal.Create"
                                }
                                props={{
                                    daoId: daoId
                                }}
                            />
                        </div>
                    )
                }}
            />
        </div>
    </Section>
);

const getProposals = (house) => {
    const proposals = Near.view(
        "registry.i-am-human.near",
        "get_proposals",
        {}
    );

    State.update({ proposals });
};

const PowerDescription = ({ color, text }) => (
    <div className="d-flex gap-3">
        <UserIcon color={color}>
            <img
                width={11}
                src="https://ipfs.near.social/ipfs/bafkreig7hd3ysbcb7dkvgzhaavltjvaw5pjtaqyj4qdbamwxhhh4yqp4su"
            />
        </UserIcon>
        <Hr />
        <Description>
            <small>{text}</small>
        </Description>
    </div>
);

const ChecksDescription = ({ house, text, description }) => (
    <div className="d-flex gap-3">
        <CircleLogoSmall
            house={house}
            className="d-flex justify-content-center align-items-center"
        >
            <small>{house}</small>
        </CircleLogoSmall>
        <Hr />
        <div className="d-flex justify-content-between gap-2">
            <Description>
                <small>{text}</small>
                {state.showChecksDescription === house && (
                    <Description className="mt-2">
                        <small className="text-secondary">
                            {description ?? "The vote needs a simple majority."}
                        </small>
                    </Description>
                )}
            </Description>
            <i
                class={
                    state.showChecksDescription === house
                        ? "bi bi-chevron-up"
                        : "bi bi-chevron-down"
                }
                role="button"
                onClick={() =>
                    State.update({
                        showChecksDescription:
                            state.showChecksDescription === house
                                ? false
                                : house
                    })
                }
            ></i>
        </div>
    </div>
);

return (
    <Container className="d-flex w-100">
        <div id="main" className="w-100">
            <div className="px-5 py-3 bg-dark">
                <h6>
                    <span className="text-secondary">NDC Governance: </span>
                    <span className="text-white">Interhouse relations</span>
                </h6>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center p-5">
                <Img
                    src={
                        state.selectedHouse === "hom"
                            ? HOM_IMG
                            : state.selectedHouse === "coa"
                            ? COA_IMG
                            : state.selectedHouse === "tc"
                            ? TC_IMG
                            : state.selectedHouse === "vb"
                            ? VB_IMG
                            : HOM_IMG
                    }
                />
            </div>
        </div>

        {state.selectedHouse && (
            <HousePanel className="shadow-sm">
                <ContentBlock
                    title={Content[state.selectedHouse].title}
                    description={Content[state.selectedHouse].description}
                    abbr={state.selectedHouse}
                    address={`${state.selectedHouse}@sputnik-dao.near`}
                    metadata={Content[state.selectedHouse].metadata}
                />
            </HousePanel>
        )}
    </Container>
);

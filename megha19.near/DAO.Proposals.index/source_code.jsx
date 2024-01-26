const daoId = props.daoId;
const proposalId = props.proposalId;
const accountId = context.accountId ?? "";

const CoADaoId = props.dev
    ? "coa.gwg-testing.near"
    : "congress-coa-v1.ndc-gwg.near";
const VotingBodyDaoId = props.dev
    ? "voting-body-v1.gwg-testing.near"
    : "voting-body-v1.ndc-gwg.near";
const TCDaoId = props.dev
    ? "tc.gwg-testing.near"
    : "congress-tc-v1.ndc-gwg.near";
const HoMDaoId = props.dev
    ? "hom.gwg-testing.near"
    : "congress-hom-v1.ndc-gwg.near";

const isCongressDaoID =
    daoId === HoMDaoId || daoId === CoADaoId || daoId === TCDaoId;

State.init({
    isProposalModalOpen: false,
    hideProposalBtn: false
});

if (proposalId) {
    return (
        <div>
            <Widget
                src="megha19.near/widget/DAO.Proposals.Card.index"
                props={props}
            />
        </div>
    );
}

if (isCongressDaoID) {
    const policy = Near.view(daoId, "get_members");
    const isMember = policy?.members?.includes(accountId);
    State.update({ hideProposalBtn: !isMember });
}

if (daoId === VotingBodyDaoId) {
    const resp = useCache(
        () =>
            asyncFetch(
                `https://api.pikespeak.ai/sbt/sbt-by-owner?holder=${accountId}&registry=registry.i-am-human.near`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5"
                    }
                }
            ).then((res) => res.body),
        daoId + "-is-human-info",
        { subscribe: false }
    );
    State.update({
        hideProposalBtn: !resp?.length > 0
    });
}

return (
    <>
        <div style={{ width: "98%" }}>
            <div className="d-flex justify-content-between flex-wrap mb-3 align-items-center gap-3 pb-3">
                <h2 className="my-auto">Proposals</h2>
                {!state.hideProposalBtn && (
                    <Widget
                        src="megha19.near/widget/Common.Layout.CardModal"
                        props={{
                            title: "Create Proposal",
                            onToggle: () =>
                                State.update({
                                    isProposalModalOpen:
                                        !state.isProposalModalOpen
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
                                            "megha19.near/widget/DAO.Proposal.Create"
                                        }
                                        props={{
                                            daoId: daoId,
                                            dev: props.dev
                                        }}
                                    />
                                </div>
                            )
                        }}
                    />
                )}
            </div>

            <Widget
                src="megha19.near/widget/DAO.Proposals.ProposalsPikespeak"
                props={{ daoId: daoId, dev: props.dev }}
            />
        </div>
    </>
);

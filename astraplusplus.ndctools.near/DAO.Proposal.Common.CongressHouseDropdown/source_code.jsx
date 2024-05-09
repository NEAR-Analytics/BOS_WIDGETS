const label = props.label;
const placeholder = props.placeholder;
const onUpdate = props.onUpdate;
const house = props.house;

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

State.init({
    house: house ? { text: house, value: house } : null
});

return (
    <div className="mb-3">
        <Widget
            src={`sking.near/widget/Common.Inputs.Select`}
            props={{
                label: label,
                noLabel: false,
                placeholder: placeholder,
                options: [
                    { text: "House of Merit", value: HoMDaoId },
                    { text: "Council of Advisors", value: CoADaoId },
                    { text: "Transparency Commission", value: TCDaoId }
                ],
                value: state.house,
                onChange: (house) => {
                    onUpdate(house.value);
                    State.update({
                        house: house
                    });
                },
                error: undefined
            }}
        />
    </div>
);

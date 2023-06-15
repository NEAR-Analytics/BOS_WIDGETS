if (context.loading) { return }

const communityId = props.communityId || "simplar.near";

const community = Social.get(`${communityId}/community/**`);

if (!community) { return "Loading..." }

const widgetList = JSON.parse(community.widgets);
const menuLinks = JSON.parse(community.menu);
const topics = JSON.parse(community.channels);

const selected = props.selected || menuLinks[0].label;

const componentFor = (label) => menuLinks.find(link => link.label === label).component;

return (
  <div class="row mt-1">
    <div class="col-auto">
      <Widget src="simplar.near/widget/Menu"
        props={{
          menuLinks,
          topics,
          selected,
          identifier: communityId,
        }}
      />
    </div>
    <div class="col-7 mx-auto">
      {selected === "discussion" ? <Widget src="near/widget/NestedDiscussions" props={{identifier: props.identifier}} />
                                 : <Widget src={componentFor(selected)} props={props} />}
    </div>
    <div class="col-3">
      <Widget src="simplar.near/widget/CommunityWidgets" props={{ widgetList }} />
    </div>
  </div>
)
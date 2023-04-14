// List of facets to show
const facets = props.facets ?? ["facet0", "facet1", "facet2", "facet3"];
// Whether to allow multiselecting or not.
const multiSelect = props.multiSelect ?? false;
// If no facet is selected, this will be the facet to be selected automatically.
const defaultFacet = props.defaultFacet;
// Options to modify the interactions behind the default facet.
const defaultFacetOptions = props.defaultFacetOptions ?? {
  // Default facet will be disabled when selecting on other facets.
  disableOnSelectOthers: true,
  // Selecting default facet will disable other facets.
  disableOthersOnSelect: true,
};

const Tabs = styled.div`
  display: flex;
  height: 48px;
  margin-bottom: -24px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    margin-left: -12px;
    margin-right: -12px;
    border-bottom: 1px solid rgba(112, 109, 218, 0.15);


    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  flex: 1;

  &:hover {
    color: #FFFFFF;
    border-bottom: 2px solid #9799F8;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const onFacetClick = (facet) => {
  let selected = {};
  if (multiSelect) {
    selected = { ...state.selected };
  }
  if (facet in selected) {
    delete selected[facet];
  } else {
    selected[facet] = true;
  }

  if (defaultFacet) {
    if (facet !== defaultFacet && defaultFacetOptions.disableOnSelectOthers) {
      delete selected[defaultFacet];
    }
    if (facet === defaultFacet && defaultFacetOptions.disableOthersOnSelect) {
      selected = {};
    }
    if (Object.keys(selected).length === 0) selected[defaultFacet] = true;
  }

  if (props.debug) {
    console.log(`Clicked ${facet}`);
  }

  State.update({
    selected,
  });

  if (props.onFacetClick) {
    props.onFacetClick(facet);
  }

  if (multiSelect && props.onMultiFacetClick) {
    props.onMultiFacetClick({
      recentFacetClick: facet,
      selectedFacets: Object.keys(selected),
    });
  }
};

const initState = () => {
  const selected = {};
  if (defaultFacet && facets.includes(defaultFacet)) {
    selected[defaultFacet] = true;
  }

  return {
    selected,
  };
};

State.init(initState());

const FacetContainer =
  props.facetContainerStyle ??
  styled.ul`
padding: 16px 16px 0px;
flex-direction: column;
justify-content: center;
align-items: flex-start;    list-style-type: none;
  width:100%;
height: 36px;

  `;

const FacetItem =
  props.facetItemStyle ??
  styled.li`
    padding: 0 14px 0 14px;
    border: 0.99995px solid #606D7A; !important;
  
  border-radius: 59.997px;

    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(96, 109, 122, 1);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;

    &:hover {
      cursor: pointer;
    }

    &.selected {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `;

return (
  <FacetContainer>
    {!state.searchResults && (
      <Tabs>
        {facets.map((facet) => (
          <TabsButton
            href={`${componentsUrl}?tab=${facet}`}
            selected={state.selectedTab === facet}
            onClick={() => onFacetClick(facet)}
          >
            {facet}
          </TabsButton>
        ))}
      </Tabs>
    )}
  </FacetContainer>
);

const CONTRACT = "social.near";

// TODO: preload record once contract is filled in?

if (context.loading) {
  return "Loading...";
}

const [record, setRecord] = useState(storedRecord);
const [showSpinner, setShowSpinner] = useState(false);
const loggedIn = !!context.accountId;

const onInputChange = ({ target }) => {
  // TODO parse by field name
  //setRecord(target.value);

  // mock data for now:
  record = {
    "foo.bar.mintbase2.near": {
      name: "Painters of Light",
      whocanmint: "testing",
      wherearethey: ["westofgreenwich", "eastofgreenwich"],
    },
  };
  // And but also: can you even do nested objects as React state?

  setRecord(record);
};

const onBtnClick = () => {
  setShowSpinner(true);
  let data = {};
  data[context.accountId] = {
    // store under this key
    cootoo: storedRecord, // todo: subkey per store
  };
  Near.call(CONTRACT, "set", data);
  setShowSpinner(false);
};

const Main = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI
`;
// TODO: how to use Bootstrap 5 in BOS?

return (
  <Main className="content">
    <div className="div">
      <div className="heading">Register your co-op</div>
      <p className="you-can-reach-us">
        Create your on-chain profile with Coötoo
      </p>
    </div>
    <div class="container px-5 my-5">
      <div className="form" id="contactForm" data-sb-form-api-token="API_TOKEN">
        {/* TODO: name fields on inputs  */}
        <div class="mb-3">
          <label class="form-label" for="chooseANameForYourCoop">
            Choose a name for your coop
          </label>
          <input
            onChange={onInputChange}
            class="form-control"
            id="chooseANameForYourCoop"
            type="text"
            placeholder="Choose a name for your coop"
            data-sb-validations="required"
          />
          <div
            class="invalid-feedback"
            data-sb-feedback="chooseANameForYourCoop:required"
          >
            Choose a name for your coop is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="contract">
            Contract
          </label>
          <input
            onChange={onInputChange}
            class="form-control"
            id="contract"
            type="text"
            placeholder="Contract"
            data-sb-validations="required"
          />
          <div class="invalid-feedback" data-sb-feedback="contract:required">
            Contract is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label d-block">Who can mint in your store?</label>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="anyoneWhoAsksNoCriteriaReally"
              type="checkbox"
              name="whoCanMintInYourStore"
              data-sb-validations=""
            />
            <label class="form-check-label" for="anyoneWhoAsksNoCriteriaReally">
              Anyone who asks no criteria really
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="weCurateSelectedApplications"
              type="checkbox"
              name="whoCanMintInYourStore"
              data-sb-validations=""
            />
            <label class="form-check-label" for="weCurateSelectedApplications">
              We curate selected applications
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="theStoreIsForASpecialEvent"
              type="checkbox"
              name="whoCanMintInYourStore"
              data-sb-validations=""
            />
            <label class="form-check-label" for="theStoreIsForASpecialEvent">
              The store is for a special event
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="weWantSpecificContentInTheSameTopic"
              type="checkbox"
              name="whoCanMintInYourStore"
              data-sb-validations=""
            />
            <label
              class="form-check-label"
              for="weWantSpecificContentInTheSameTopic"
            >
              We want specific content in the same topic
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="weWantASpecificTypeOfMediaOrTechnique"
              type="checkbox"
              name="whoCanMintInYourStore"
              data-sb-validations=""
            />
            <label
              class="form-check-label"
              for="weWantASpecificTypeOfMediaOrTechnique"
            >
              We want a specific type of media or technique
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="theStoreIsJustForTesting"
              type="checkbox"
              name="whoCanMintInYourStore"
              data-sb-validations=""
            />
            <label class="form-check-label" for="theStoreIsJustForTesting">
              The store is just for testing
            </label>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label d-block">
            Where are your minters geographically located?
          </label>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="westOfGreenwich"
              type="checkbox"
              name="whereAreYourMintersGeographicallyLocated"
              data-sb-validations=""
            />
            <label class="form-check-label" for="westOfGreenwich">
              West of Greenwich
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="eastOfGreenwich"
              type="checkbox"
              name="whereAreYourMintersGeographicallyLocated"
              data-sb-validations=""
            />
            <label class="form-check-label" for="eastOfGreenwich">
              East of Greenwich
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="allOverTheWorld"
              type="checkbox"
              name="whereAreYourMintersGeographicallyLocated"
              data-sb-validations=""
            />
            <label class="form-check-label" for="allOverTheWorld">
              All over the world
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="northOfEquator"
              type="checkbox"
              name="whereAreYourMintersGeographicallyLocated"
              data-sb-validations=""
            />
            <label class="form-check-label" for="northOfEquator">
              North of Equator
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="southOfEquator"
              type="checkbox"
              name="whereAreYourMintersGeographicallyLocated"
              data-sb-validations=""
            />
            <label class="form-check-label" for="southOfEquator">
              South of Equator
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              onChange={onInputChange}
              class="form-check-input"
              id="locationUnknown"
              type="checkbox"
              name="whereAreYourMintersGeographicallyLocated"
              data-sb-validations=""
            />
            <label class="form-check-label" for="locationUnknown">
              Location unknown
            </label>
          </div>
        </div>

        <div class="p-4">
          <div className="input-group" hidden={!loggedIn}>
            <button class="btn btn-primary" onClick={onBtnClick}>
              <span hidden={showSpinner}>Create co-op profile</span>
              <i
                class="spinner-border spinner-border-sm"
                hidden={!showSpinner}
              ></i>
            </button>
          </div>

          <p class="text-center py-2" hidden={loggedIn}>
            Connect your wallet to create a profile
          </p>
        </div>
      </div>
    </div>
  </Main>
);

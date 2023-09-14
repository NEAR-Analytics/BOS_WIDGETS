// Add tooltips to show long explanations on hover
const options = props.options || "#/opencann.near/widget/substance.metadata";
const substances = props.options ?? "#opencann.near.widget/substance.array";
const substance = props.substance ?? "cannabis";
const consumptionMethod = substance.consumptionMethod;
const physicalEffects = substance.physicalEffects;
const visualEffects = substance.visualEffects;
const auditoryEffects = substance.auditoryEffects;
const cognitiveEffects = substance.cognitiveEffects;
const multisensoryEffects = substance.multisensoryEffects;

const UUID = {
  generate: (template) => {
    if (typeof template !== "string") {
      template = "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx";
    }
    return template.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};

const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
  const currentDate = new Date();

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const isoTime = (date, time) => {
  const temp = new Date(`${date} ${time}`);
  const now = temp.toISOString();

  return now.split("T")[1];
};

const isoDate = (date, time) => {
  const temp = new Date(`${date} ${time}`);
  const now = temp.toISOString();

  return now.split("T")[0];
};

const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR account";
}

let user_account = context.accountId;

State.init({
  id: UUID.generate(),
  title: "",
  substance: props.substance,
  consumptionMethod: substance.consumptionMethod,
  dose: "",
  description: {
    content: "# New Response Description",
  },
  otherSubstances: "Other substances taken during this experience.",
  setSetting: {
    content: "# New Set and Setting Description",
  },
  physicalEffects: [],
  visualEffects: [],
  auditoryEffects: [],
  cognitiveEffects: [],
  multisensoryEffects: [],
  productName: "",
  brandName: "",
  batchNumber: "",
  start: getCurrentDate(),
  startTime: getCurrentTime(),
  end: getCurrentDate(),
  endTime: getCurrentTime(),
  location: "",
  link: "",
  organizer: "opencann.near",
  isAllDay: false,
  category: "",
  logo: null,
  background: null,
  customWidget: "",
  daoId: "cannabis-genome.sputnik-dao.near",
  tempHash: "",
  hashTags: [],
});

const onTitleChange = ({ target }) => {
  State.update({ title: target.value });
};

const onSubstanceChange = (target) => {
  State.update({ substance: target });
};

const onConsumptionMethodChange = (target) => {
  State.update({ consumptionMethod: target });
};

const onDoseChange = (target) => {
  State.update({ dose: target });
};

const onDescriptionChange = (target) => {
  State.update({ description: target });
};

const onOtherSubstancesChange = (target) => {
  State.update({ otherSubstances: target });
};

const onSetSettingChange = (target) => {
  State.update({ setSetting: target });
};

const onPhysicalEffectsChange = (target) => {
  State.update({ physicalEffects: target });
};

const onVisuallEffectsChange = (target) => {
  State.update({ visualEffects: target });
};

const onAuditoryEffectsChange = (target) => {
  State.update({ auditoryEffects: target });
};

const onCognitiveEffectsChange = (target) => {
  State.update({ cognitiveEffects: target });
};

const onMultiSensoryEffectsChange = (target) => {
  State.update({ multisensoryEffects: target });
};

const onProductNameChange = (target) => {
  State.update({ productName: target });
};

const onBrandNameChange = (target) => {
  State.update({ brandName: target });
};

const onBatchNumberChange = (target) => {
  State.update({ batchNumber: target });
};

const onStartChange = ({ target }) => {
  State.update({ start: target.value });
};

const onStartTimeChange = ({ target }) => {
  State.update({ startTime: target.value });
};

const onEndChange = ({ target }) => {
  State.update({ end: target.value });
};

const onEndTimeChange = ({ target }) => {
  State.update({ endTime: target.value });
};

const onLocationChange = ({ target }) => {
  State.update({ location: target.value });
};

const onLinkChange = ({ target }) => {
  State.update({ link: target.value });
};

const onOrganizerChange = ({ target }) => {
  State.update({ organizer: target.value });
};

const onCategoryChange = ({ target }) => {
  State.update({ category: target.value });
};

const onIsAllDayChange = () => {
  State.update({ isAllDay: !state.isAllDay });
};

const onLogoChange = (target) => {
  State.update({ logo: target });
};

const onBackgroundChange = (target) => {
  State.update({ background: target });
};

const onTempHashChange = ({ target }) => {
  State.update({ tempHash: target.value });
};

const onHashTagAdd = () => {
  State.update({ hashTags: [...state.hashTags, state.tempHash] });
  State.update({ tempHash: "" });
};

const onHashTagRemove = (target) => {
  const newTags = state.hashTags.filter((item) => item !== target);
  State.update({ hashTags: newTags });
};

const onCustomWidgetChange = ({ target }) => {
  State.update({ customWidget: target.value });
};

const onDaoIDChange = ({ target }) => {
  State.update({ daoId: target.value });
};

const clearFields = () => {
  State.update({
    title: "",
    substance: "cannabis",
    consumptionMethod: ["smoke", "vapor"],
    dose: "",
    description: {
      content: "# New Response Description",
    },
    otherSubstances: "Other substances taken during this experience.",
    setSetting: {
      content: "# New Set and Setting Description",
    },
    physicalEffects: ["", ""],
    visualEffects: ["", ""],
    auditoryEffects: ["", ""],
    cognitiveEffects: ["", ""],
    multisensoryEffects: ["", ""],
    productName: "",
    brandName: "",
    batchNumber: "",
    start: getCurrentDate(),
    startTime: getCurrentTime(),
    end: getCurrentDate(),
    endTime: getCurrentTime(),
    location: "",
    link: "",
    organizer: "opencann.near",
    isAllDay: false,
    category: "",
    logo: null,
    background: null,
    customWidget: "",
    daoId: "cannabis-genome.sputnik-dao.near",
    tempHash: "",
    hashTags: [],
  });
};

const createNewResponse = () => {
  const newResponse = {
    data: {
      id: state.id,
      title: state.title,
      substance: state.substance,
      consumptionMethod: state.method,
      dose: state.dose,
      description: state.description,
      otherSubstances: state.otherSubstances,
      setSetting: state.setSetting,
      physicalEffects: state.physicalEffects,
      visualEffects: state.visualEffects,
      auditoryEffects: state.auditoryEffects,
      cognitiveEffects: state.cognitiveEffects,
      multisensoryEffects: state.multisensoryEffects,
      productName: state.productName,
      brandName: state.brandName,
      batchNumber: state.batchNumber,
      start: isoDate(state.start, state.startTime),
      startTime: isoTime(state.start, state.startTime),
      end: isoDate(state.end, state.endTime),
      endTime: isoTime(state.end, state.endTime),
      location: state.location,
      link: state.link,
      organizer: state.organizer,
      isAllDay: state.isAllDay,
      category: state.category,
      logo: state.logo,
      background: state.background,
      hashTags: state.hashTags,
    },
    template: {
      src: "opencann.near/widget/ResponseView",
    },
    type: "every.near/type/response",
  };

  return newResponse;
};

const addResponse = (target) => {
  const thingId = target.data.id;
  // index new response
  Social.set({
    thing: {
      [thingId]: target,
    },
    index: {
      every: JSON.stringify({
        key: "every.near/type/response",
        value: {
          type: "every.near/type/response",
          id: thingId,
        },
      }),
    },
  });

  State.update({ response: target });
};

const handleNewResponse = () => {
  const newResponse = {
    data: {
      id: state.id,
      title: state.title,
      substance: state.substance,
      consumptionMethod: state.method,
      dose: state.dose,
      description: state.description,
      otherSubstances: state.otherSubstances,
      setSetting: state.setSetting,
      physicalEffects: state.physicalEffects,
      visualEffects: state.visualEffects,
      auditoryEffects: state.auditoryEffects,
      cognitiveEffects: state.cognitiveEffects,
      multisensoryEffects: state.multisensoryEffects,
      productName: state.productName,
      brandName: state.brandName,
      batchNumber: state.batchNumber,
      start: isoDate(state.start, state.startTime),
      startTime: isoTime(state.start, state.startTime),
      end: isoDate(state.end, state.endTime),
      endTime: isoTime(state.end, state.endTime),
      location: state.location,
      link: state.link,
      organizer: state.organizer,
      isAllDay: state.isAllDay,
      category: state.category,
      logo: state.logo,
      background: state.background,
      hashTags: state.hashTags,
    },
    template: {
      src: "itexpert120-contra.near/widget/ResponseView",
    },
    type: "every.near/type/Response",
  };

  addResponse(newResponse);
  clearFields();
};

const ResponseForm = () => {
  return (
    <div className="container">
      <div>
        <h5>
          <a
            href="https://www.opencann.net/#/opencann.near/widget/profile.edit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Complete Your Profile Before You Begin
          </a>
        </h5>
        <hr></hr>

        <p>
          Instructions: describe one (1) experience you had with cannabis.{" "}
          <b>This form is meant to be anonymous</b>, so only include as much
          detail as you feel comfortable sharing.
        </p>

        <hr></hr>
        <h4>Cannabis Experience Report</h4>
        <p></p>
        <div className="mb-3">
          <label class="form-label" for="title">
            Give Your Report a Name
          </label>
          <input
            class="form-control"
            id="title"
            value={state.title}
            onChange={onTitleChange}
            placeholder="New Response Title"
          />
        </div>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: state.consumptionMethod,
              onChange: onConsumptionMethodChange,
              height: "250px",
              options: substance.consumptionMethod,
              label: "How did you consume cannabis?",
              placeholder: "Select all methods that apply.",
            }}
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="dose">
            Estimated Dose
          </label>
          <input
            class="form-control"
            id="dose"
            value={state.dose}
            onChange={onDoseChange}
            placeholder="Estimated Dose"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="otherSubstances">
            Other Substances Taken
          </label>
          <input
            class="form-control"
            id="otherSubstances"
            value={state.otherSubstances}
            onChange={onOtherSubstancesChange}
            placeholder="Other Substances Taken"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="description">
            Describe Your Experience
          </label>
          <Widget
            src="efiz.near/widget/every.markdown.create"
            props={{
              data: state.description,
              onChange: onDescriptionChange,
              height: "250px",
            }}
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="setSetting">
            Set and Setting
          </label>
          <Widget
            src="efiz.near/widget/every.markdown.create"
            props={{
              data: state.setSetting,
              onChange: onSetSettingChange,
              height: "250px",
            }}
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label for="start">Experience Start Date</label>
            <input
              class="form-control"
              id="start"
              type="date"
              value={state.start}
              onChange={onStartChange}
            />
          </div>
          <div className="col">
            <label for="startTime">Experience Start Time</label>
            <input
              class="form-control"
              id="startTime"
              type="time"
              value={state.startTime}
              onChange={onStartTimeChange}
            />
          </div>
        </div>
        <div className="row  mb-3">
          <div className="col">
            <label for="end">Experience End Date</label>
            <input
              class="form-control"
              id="end"
              type="date"
              value={state.end}
              onChange={onEndChange}
            />
          </div>
          <div className="col">
            <label for="endTime">Experience End Time</label>
            <input
              class="form-control"
              id="endTime"
              type="time"
              value={state.endTime}
              onChange={onEndTimeChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label class="form-label" for="location">
            Geographic Region
          </label>
          <input
            class="form-control"
            id="location"
            value={state.location}
            onChange={onLocationChange}
            placeholder="Where did your experience take place?"
          />
        </div>
        <hr></hr>
        <h5>Perceived Effects</h5>
        <p></p>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: state.physicalEffects,
              onChange: onPhysicalEffectsChange,
              height: "250px",
              options: props.cannabis.physicalEffects,
              label: "Physical Effects",
              placeholder: "Select all that apply.",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: state.visualEffects,
              onChange: onVisuallEffectsChange,
              height: "250px",
              options: props.cannabis.visualEffects,
              label: "Visual Effects",
              placeholder: "Select all methods that apply.",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: state.auditoryEffects,
              onChange: onAuditoryEffectsChange,
              height: "250px",
              options: props.substance.auditoryEffects,
              label: "Auditory Effects",
              placeholder: "Select all methods that apply.",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: state.cognitiveEffects,
              onChange: onCognitiveEffectsChange,
              height: "250px",
              options: props.substance.cognitiveEffects,
              label: "Cognitive Effects",
              placeholder: "Select all methods that apply.",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: state.multisensoryEffects,
              onChange: onMultiSensoryEffectsChange,
              height: "250px",
              options: props.substance.multisensoryEffects,
              label: "Multi-sensory Effects",
              placeholder: "Select all methods that apply.",
            }}
          />
        </div>
        <hr></hr>
        <h5>Product Information</h5>
        <p></p>
        <div className="mb-3">
          <label class="form-label" for="productName">
            Product Name/Description
          </label>
          <input
            class="form-control"
            id="productName"
            value={state.productName}
            onChange={onProductNameChange}
            placeholder="Product Name/Description"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="brandName">
            Brand Name (if available)
          </label>
          <input
            class="form-control"
            id="brandName"
            value={state.brandName}
            onChange={onBrandNameChange}
            placeholder="Brand Name (if available)"
          />
        </div>
        <div></div>
        <div className="mb-3">
          <label class="form-label" for="batchNumber">
            Batch Number
          </label>
          <input
            class="form-control"
            id="batchNumber"
            value={state.batchNumber}
            onChange={onBatchNumberChange}
            placeholder="Batch Number"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="link">
            Link to Product/Strain
          </label>
          <input
            class="form-control"
            id="link"
            type="url"
            value={state.link}
            onChange={onLinkChange}
            placeholder="Link to Product/Strain"
          />
        </div>

        <div className="mb-3 row ">
          <div className="col">
            <label>Photo of Product(s) Consumed</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: state.logo, onChange: onLogoChange }}
            />
          </div>
          <div className="col">
            <label>Product Manufacturer Logo</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: state.background, onChange: onBackgroundChange }}
            />
          </div>
        </div>
        <hr></hr>
        <div className="mb-3">
          <label for="hashtags">
            <p>
              Hashtags:{" "}
              {state.hashTags.length !== 0 &&
                state.hashTags.map((item) => (
                  <>
                    <span className="badge text-bg-primary">
                      {item}{" "}
                      <i
                        className="bi bi-x ms-2 p-1"
                        onClick={() => onHashTagRemove(item)}
                      ></i>
                    </span>{" "}
                  </>
                ))}
            </p>
          </label>
          <div className="mb-3 d-flex gap-3">
            <input
              id="hashtags"
              value={state.tempHash}
              onChange={onTempHashChange}
              placeholder="New Response Tags"
            />
            <button onClick={onHashTagAdd}>Add</button>
          </div>
          <div className="mb-3">
            <label for="organizer">Form Creator: </label>
            <a
              href="https://opencann.near.social"
              target="_blank"
              rel="noopener noreferrer"
            >
              opencann.near
            </a>
          </div>
          <div className="mb-3">
            <label for="daoId">DAO ID: </label>
            <a
              href="https://explorer.near.org/accounts/cannabis-genome.sputnik-dao.near"
              target="_blank"
              rel="noopener noreferrer"
            >
              cannabis-genome.sputnik-dao.near
            </a>
          </div>
        </div>
        <div className="mb-3">
          <button onClick={handleNewResponse}>Submit Response</button>

          <button onClick={clearFields}>Clear Fields</button>
        </div>
      </div>
    </div>
  );
};

return <ResponseForm />;

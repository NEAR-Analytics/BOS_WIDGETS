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

const addSubstance = props.addSubstance;
const proposeSubstance = props.proposeSubstance;

let user_account = context.accountId;

State.init({
  id: UUID.generate(),
  title: "",
  description: {
    content: "# New Substance Description",
  },
  start: getCurrentDate(),
  startTime: getCurrentTime(),
  end: getCurrentDate(),
  endTime: getCurrentTime(),
  location: "",
  link: "",
  organizer: user_account,
  isAllDay: false,
  category: "",
  logo: null,
  background: null,
  customWidget: "",
  daoId: "",
  tempHash: "",
  hashTags: [],
});

const onTitleChange = ({ target }) => {
  State.update({ title: target.value });
};

const onDescriptionChange = (target) => {
  State.update({ description: target });
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
    description: {
      content: "# New Substance Description",
    },
    start: getCurrentDate(),
    startTime: getCurrentTime(),
    end: getCurrentDate(),
    endTime: getCurrentTime(),
    location: "",
    link: "",
    organizer: user_account,
    isAllDay: false,
    category: "",
    logo: null,
    background: null,
    tempHash: "",
    customWidget: "",
    daoId: "",
    hashTags: [],
  });
};

const createNewSubstance = () => {
  const newSubstance = {
    data: {
      id: state.id,
      title: state.title,
      description: state.description,
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
      src: "itexpert120-contra.near/widget/EventView",
    },
    type: "every.near/type/substance",
  };

  return newSubstance;
};

const handleProposeSubstance = () => {
  const newSubstance = createNewSubstance();

  proposeSubstance(newSubstance);
  clearFields();
};

const handleNewSubstance = () => {
  const newSubstance = {
    data: {
      id: state.id,
      title: state.title,
      description: state.description,
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
      src: "itexpert120-contra.near/widget/EventView",
    },
    type: "every.near/type/substance",
  };

  addSubstance(newSubstance);
  clearFields();
};

const SubstanceForm = () => {
  return (
    <div className="container">
      <div>
        <div className="mb-3">
          <label class="form-label" for="title">
            Substance Title
          </label>
          <input
            class="form-control"
            id="title"
            value={state.title}
            onChange={onTitleChange}
            placeholder="New Substance Title"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="description">
            Substance Description
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
        <div className="row mb-3">
          <div className="col">
            <label for="start">Substance Start Date</label>
            <input
              class="form-control"
              id="start"
              type="date"
              value={state.start}
              onChange={onStartChange}
            />
          </div>
          <div className="col">
            <label for="startTime">Substance Start Time</label>
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
            <label for="end">Substance End Date</label>
            <input
              class="form-control"
              id="end"
              type="date"
              value={state.end}
              onChange={onEndChange}
            />
          </div>
          <div className="col">
            <label for="endTime">Substance End Time</label>
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
            Substance Location
          </label>
          <input
            class="form-control"
            id="location"
            value={state.location}
            onChange={onLocationChange}
            placeholder="New Substance Location"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="link">
            Substance Link
          </label>
          <input
            class="form-control"
            id="link"
            type="url"
            value={state.link}
            onChange={onLinkChange}
            placeholder="New Substance Link"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="organizer">
            Substance Organizer
          </label>
          <input
            class="form-control"
            id="organizer"
            value={state.organizer}
            onChange={onOrganizerChange}
            placeholder="New Substance Organizer"
          />
        </div>
        <div className="mb-3">
          <div class="form-check">
            <label class="form-check-label" for="isAllDay">
              All Day Substance
            </label>
            <input
              value={state.isAllDay}
              checked={state.isAllDay}
              class="form-check-input"
              type="checkbox"
              id="isAllDay"
              onChange={onIsAllDayChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label class="form-label" for="category">
            Substance Category
          </label>
          <input
            class="form-control"
            id="category"
            value={state.category}
            onChange={onCategoryChange}
            placeholder="New Substance Category"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="customWidget">
            Custom Substance Card Source
          </label>
          <input
            class="form-control"
            id="customWidget"
            value={state.customWidget}
            onChange={onCustomWidgetChange}
            placeholder="Custom Substance Card Source"
          />
        </div>
        <div className="mb-3 row ">
          <div className="col">
            <label>Logo Image</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: state.logo, onChange: onLogoChange }}
            />
          </div>
          <div className="col">
            <label>Background Image</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: state.background, onChange: onBackgroundChange }}
            />
          </div>
        </div>
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
              placeholder="New Substance Tags"
            />
            <button onClick={onHashTagAdd}>Add</button>
          </div>
          <div className="mb-3">
            <label for="daoId">DAO ID</label>
            <input
              id="daoId"
              name="daoId"
              value={state.daoId}
              onChange={onDaoIDChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <button onClick={handleNewSubstance}>Add Substance</button>
          <Widget
            src="itexpert120-contra.near/widget/EventProposalButton"
            props={{ daoId: state.daoId, substance: createNewSubstance() }}
          />
          <button onClick={clearFields}>Clear Fields</button>
        </div>
      </div>
    </div>
  );
};

return <SubstanceForm />;

function ExperienceSurveyForm(props) {
    const { title, consumptionMethod, dose, description } = props.data;
  return (
    <div className="container">
      <div>
        <hr></hr>
        <h6>
          <i>
            *Please complete your
            <a
              href="https://www.opencann.net/#/opencann.near/widget/profile.edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              profile
            </a>{" "}
            and
            <a
              href="https://www.opencann.net/#/opencann.near/widget/profile.demographics"
              target="_blank"
              rel="noopener noreferrer"
            >
              demographics
            </a>
            before starting.
          </i>
        </h6>
        <hr></hr>
        <h4>Cannabis Experience Report</h4>
        <p>
          Instructions: describe one (1) experience you had with cannabis.{" "}
          <b>OpenCann is designed to support anonymity</b>. Only include as much
          detail as you feel comfortable having associated with your{" "}
          <a
            href="https://www.opencann.net/#/opencann.near/widget/profile.edit"
            target="_blank"
            rel="noopener noreferrer"
          >
            profile
          </a>{" "}
          .
        </p>
        <div className="mb-3">
          <label class="form-label" for="title">
            Title Your Report
          </label>
          <input
            class="form-control"
            id="title"
            value={props.data.title}
            onChange={onTitleChange}
            placeholder="e.g. My First Cannnabis Experience"
          />
        </div>
        <div className="mb-3">
          <Widget
            src="nearhorizon.near/widget/Inputs.MultiSelect"
            props={{
              data: props.data.consumptionMethod,
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
            value={props.data.dose}
            onChange={onDoseChange}
            placeholder="Describe as best as possible"
          />
        </div>
        <div className="mb-3">
          <label class="form-label" for="otherSubstances">
            Other Substances Taken
          </label>
          <input
            class="form-control"
            id="otherSubstances"
            value={props.data.otherSubstances}
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
              data: props.data.description,
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
              data: props.data.setSetting,
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
              value={props.data.start}
              onChange={onStartChange}
            />
          </div>
          <div className="col">
            <label for="startTime">Experience Start Time</label>
            <input
              class="form-control"
              id="startTime"
              type="time"
              value={props.data.startTime}
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
              value={props.data.end}
              onChange={onEndChange}
            />
          </div>
          <div className="col">
            <label for="endTime">Experience End Time</label>
            <input
              class="form-control"
              id="endTime"
              type="time"
              value={props.data.endTime}
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
            value={props.data.location}
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
              data: props.data.physicalEffects,
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
              data: props.data.visualEffects,
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
              data: props.data.auditoryEffects,
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
              data: props.data.cognitiveEffects,
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
              data: props.data.multisensoryEffects,
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
            value={props.data.productName}
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
            value={props.data.brandName}
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
            value={props.data.batchNumber}
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
            value={props.data.link}
            onChange={onLinkChange}
            placeholder="Link to Product/Strain"
          />
        </div>

        <div className="mb-3 row ">
          <div className="col">
            <label>Photo of Product(s) Consumed</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: props.data.logo, onChange: onLogoChange }}
            />
          </div>
          <div className="col">
            <label>Product Manufacturer Logo</label>
            <Widget
              src="near/widget/ImageEditorTabs"
              props={{ image: props.data.background, onChange: onBackgroundChange }}
            />
          </div>
        </div>
        <hr></hr>
        <div className="mb-3">
          <label for="hashtags">
            <p>
              Hashtags:{" "}
              {props.data.hashTags.length !== 0 &&
                props.data.hashTags.map((item) => (
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
              value={props.data.tempHash}
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
}

//return <ExperienceSurveyForm />;
return { ExperienceSurveyForm };

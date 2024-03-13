const accountId = context.accountId;

const [plan, setPlan] = useState(() => {
  const initialData = Social.getr(`${accountId}/build/plan`) ?? {
    metadata: {
      planName: "",
      goals: "",
      timeline: {
        startDate: "",
        endDate: "",
      },
      teamMembers: [],
      tasks: {
        id: "",
        assignedTo: "",
        estimatedEffort: "",
        taskStatus: "",
      },
      dependencies: {
        depName: "",
        depSource: "",
        depNotes: "",
      },
      milestones: {
        targetDate: "",
        targetOutcome: "",
        isMet: "",
      },
      collaborations: {
        meetingDetails: "",
        meetingLocation: "",
        howToJoin: "",
      },
      reviewMeeting: {
        datePlanned: "",
        dateHeld: "",
        meetingNotes: "",
      },
      retroMeeting: {
        datePlanned: "",
        dateHeld: "",
        meetingNotes: "",
      },
    },
  };
  return initialData;
});

const handlePlanNameChange = (e) => {
  const newPlanName = e.target.value;
  setPlan((prevPlan) => ({
    ...prevPlan,
    metadata: { ...prevPlan.metadata, planName: newPlanName },
  }));
};

const handleGoalsChange = (e) => {
  const newGoals = e.target.value;
  setPlan((prevPlan) => ({
    ...prevPlan,
    metadata: { ...prevPlan.metadata, goals: newGoals },
  }));
};

const handleStartDateChange = (e) => {
  const newStartDate = e.target.value;
  setPlan((prevPlan) => ({
    ...prevPlan,
    metadata: { ...prevPlan.metadata, startDate: newStartDate },
  }));
};

const handleEndDateChange = (e) => {
  const newEndDate = e.target.value;
  setPlan((prevPlan) => ({
    ...prevPlan,
    metadata: { ...prevPlan.metadata, endDate: newEndDate },
  }));
};

const handleBuilderNameChange = (index, e) => {
  const newBuilderName = e.target.value;
  setPlan((prevPlan) => {
    const updatedTeamMembers = [...prevPlan.metadata.teamMembers];
    updatedTeamMembers[index].name = newBuilderName;
    return {
      ...prevPlan,
      metadata: {
        ...prevPlan.metadata,
        teamMembers: updatedTeamMembers,
      },
    };
  });
};

const handleBuilderRoleChange = (index, e) => {
  const newBuilderRole = e.target.value;
  setPlan((prevPlan) => {
    const updatedTeamMembers = [...prevPlan.metadata.teamMembers];
    updatedTeamMembers[index].role = newBuilderRole;
    return {
      ...prevPlan,
      metadata: {
        ...prevPlan.metadata,
        teamMembers: updatedTeamMembers,
      },
    };
  });
};

const handleSave = () => {
  Social.set({
    build: { plan },
  });
};

return (
  <div>
    <div className="m-2">
      <h2>Create/Update A Plan</h2>
      <div className="mb-3 p-1">
        <label for="planName">Name:</label>
        <input
          id="planName"
          type="text"
          placeholder="What is the plan or project's name?"
          value={plan.metadata.planName}
          onChange={handlePlanNameChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="goals">Goals:</label>
        <textarea
          id="goals"
          name="goals"
          className="form-control rounded"
          resize="none"
          rows="6"
          cols="80"
          placeholder="Define project goals here. Remember to include outcomes, timelines, and criteria for measuring success."
          value={plan.metadata.goals}
          onChange={handleGoalsChange}
        />
      </div>
      <div className="mb-3 p-1">
        <h3>Timeline:</h3>
        <label>Start date:</label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          min="2024-03-12"
          value={plan.metadata.timeline.startDate}
          onChange={handleStartDateChange}
        />
        <label>End date:</label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          min="2024-03-12"
          value={plan.metadata.timeline.endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <Widget
              src="dawnkelly.near/widget/build.teamMembersAndRoles"
              handleBuilderNameChange={handleBuilderNameChange}
              handleBuilderRoleChange={handleBuilderRoleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>Project Tasks</h3>
        <p>task id</p>
        <p>assigned</p>
        <p>estimated effort</p>
        <p>status</p>
      </div>
      <div>
        <h3>Dependencies</h3>
      </div>
      <div>
        <h3>Milestones</h3>
      </div>
      <div>
        <h3>Open collaborations</h3>
      </div>
      <div>
        <h4>Review Meeting</h4>
        <p>date scheduled</p>
        <p>date held</p>
        <p>notes</p>
        //Objectives: evaluate what was completed, what wasn't, and why.
      </div>
      <div>
        <h4>Retrospective Meeting</h4>
        <p>date scheduled</p>
        <p>date held</p>
        <p>notes</p>
        //Objectives: reflect on the sprint process, what went well, what did
        not, and how processes could be improved.
      </div>
      <div className="m-3">
        <button
          className="btn btn-outline-success"
          disabled={!context.accountId}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

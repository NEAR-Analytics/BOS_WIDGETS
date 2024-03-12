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
      teamMembers: {
        builderName: "",
        builderRole: "",
      },
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

const handleSave = () => {
  Social.set({
    build: { plan },
  });
};

return (
  <div>
    <div className="m-2">
      <h4>Create/Update A Plan</h4>
      <div className="mb-3 p-1">
        <label for="planName">Name:</label>
        <input
          id="planName"
          type="text"
          placeholder="What is the plan or project's name?"
          value={plan.metadata.planName}
          onChange={handlePlanNameChange}
        />
        <div className="mb-3 p-1">
          <label for="goals">Goals:</label>
          <textarea
            id="goals"
            name="goals"
            resize="none"
            rows="4"
            cols="80"
            placeholder="Define project goals here. Remember to include outcomes, timelines, and criteria for measuring success."
            value={plan.metadata.planName}
            onChange={handlePlanNameChange}
          />
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
  </div>
);

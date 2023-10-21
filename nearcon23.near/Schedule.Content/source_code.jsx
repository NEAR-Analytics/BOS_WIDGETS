const accountId = "nearcon23.near";

initState({ data: [] });
const apiKey =
  "patWQQ6FY8H5O8wTY.4b08b48ac31aa13eb9fea974cfa60e103ae7297c010d4fe752e1abb37bd24c9d";

// Airtable API Url: "https://api.airtable.com/v0/appcR9zt96Wv7VXWl/tblSMeBodnZWPL1vj"
const airtableId = "appcR9zt96Wv7VXWl";
const airtableTableId = "tblSMeBodnZWPL1vj";

const airtableApiUrl = `https://api.airtable.com/v0/${airtableId}/${airtableTableId}`;
const sessionsByDate = {};
//⚙️ Start Time- get event Data and time
// ⚙️ End Time Calculated by Duration- get the end time
//fields.title
// fields.description
//fields.track
//fields.Confirmed Speakers Full Name - if speaker
//
//fields.Start Time Formatted for Calendar
//fields.End Time Formatted for Calendar

const imageLink =
  "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";

asyncFetch(airtableApiUrl, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
}).then(({ body }) => {
  const { records } = body;
  const dataToSet = [...records];
  dataToSet.sort((a, b) => {
    let dateA = new Date(a.fields["⚙️ Start Time"]);
    let dateB = new Date(b.fields["⚙️ Start Time"]);
    return dateA - dateB;
  });

  // Extract the relevant fields and store them in a new array of objects:
  let allLocations = {};

  const simplifiedData = dataToSet
    .filter((data) => {
      return data.fields["Web Publishing Status"]?.length > 0;
    })
    .map((data) => {
      allLocations[data.fields["Location"]] = true;

      return {
        startTime: data.fields["⚙️ Start Time"],
        endTime: data.fields["⚙️ End Time Calculated by Duration"],
        title: data.fields["⚙️ Session Name"],
        description: data.fields["⚙️ Description?"],
        location: data.fields["Location"],
        track: data?.fields?.["Track"]
          ? data?.fields?.["Track"].map((item) => item.toLowerCase())
          : null,
        // Assuming that you want to retrieve some speaker name from a different field:
        confirmedSpeakers: data.fields["Confirmed Speakers Full Name"] ?? [], // Replace with an actual field name if applicable
        startTimeFormatted: data.fields["Start Time Formatted for Calendar"],
        endTimeFormatted: data.fields["End Time Formatted for Calendar"],
      };
    });

  simplifiedData.forEach((session) => {
    let date = new Date(session.startTime).toDateString(); // Converts time to a string that represents only the date, not the time
    sessionsByDate[date] = sessionsByDate[date] || [];
    sessionsByDate[date].push(session);
  });

  // Convert the grouped sessions object into an array of session arrays:
  let groupedSessionsArray = Object.values(sessionsByDate);

  State.update({
    data: groupedSessionsArray,
    locations: Object.keys(allLocations),
  });
});

return (
  <>
    <div
      style={{
        zIndex: -100,
        position: "none",
        minHeight: 600,
        overflow: "visible",
      }}
    >
      <Widget
        src={`${accountId}/widget/Schedule.Filters`}
        props={{
          update: (d) => State.update({ filters: d }),
          locations: state.locations,
        }}
      />
      {state.data.map((dateData, index) => {
        return (
          <div key={index}>
            <Widget
              src={`${accountId}/widget/Schedule.ContentScheduleShow`}
              props={{
                dateData,
                index,
                filter: state.filters,
              }}
            />
          </div>
        );
      })}
    </div>
  </>
);

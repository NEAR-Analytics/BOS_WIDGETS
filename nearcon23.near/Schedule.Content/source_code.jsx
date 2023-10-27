const accountId = "nearcon23.near";

initState({ data: [] });

// Airtable API Url: "https://api.airtable.com/v0/appcR9zt96Wv7VXWl/tblSMeBodnZWPL1vj"

const agendaUrl = `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/airtable/agenda`;

const speakersUrl = `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/airtable/speakers`;
const sessionsByDate = {};

const imageLink =
  "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";

asyncFetch(agendaUrl).then(({ body }) => {
  const records = body;
  const dataToSet = [...records];
  dataToSet.sort((a, b) => {
    let dateA = new Date(a["⚙️ Start Time"]);
    let dateB = new Date(b["⚙️ Start Time"]);
    return dateA - dateB;
  });

  // Extract the relevant fields and store them in a new array of objects:
  let allLocations = {};
  asyncFetch(speakersUrl).then(({ body: speakerBody }) => {
    const imageData = {};
    speakerBody.map((item) => {
      imageData[item.ref] = item.image;
    });
    const simplifiedData = dataToSet
      .filter((_) => {
        const wps = _["Web Publishing Status"];

        return (
          _["Web Publishing Status"]?.length > 0 &&
          !wps.includes("reczlWVomn8QUBxXF")
        );
      })
      .map((data) => {
        allLocations[data["Location"]] = true;

        const speakers = [
          ...(data?.["Confirmed Speakers Full Name"] ?? []),
          ...(data?.["Confirmed Moderator Full Name"] ?? []),
        ];
        const allImages = [];
        speakers.map((item) => {
          allImages.push(imageData[item]);
        });

        return {
          startTime: data["⚙️ Start Time"],
          endTime: data["⚙️ End Time"],
          title: data["⚙️ Session Name"],
          description: data["Description"],
          location: data["Location"],
          track: data?.["Track"]
            ? data?.["Track"].map((item) => item.toLowerCase())
            : null,
          imageIds: allImages,
          // Assuming that you want to retrieve some speaker name from a different field:
          confirmedSpeakers: speakers, // Replace with an actual field name if applicable
          startTimeFormatted: data["Start Time Formatted for Calendar"],
          endTimeFormatted: data["End Time Formatted for Calendar"],
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

// CALENDAR FROM https://github.com/fullcalendar/fullcalendar/tree/main/bundle
const events = [
  {
    date: "2023-08-14",
    id: "393tks0jc2sg5gajdmtt041rsl",
    title: "Account Abstraction and Near BOS",
    description:
      '<a href="https://www.meetup.com/copenhagen-ethereum-meetup/events/295027739/?utm_medium=referral&amp;utm_campaign=share-btn_savedevents_share_modal&amp;utm_source=link">https://www.meetup.com/copenhagen-ethereum-meetup/events/295027739/?utm_medium=referral&amp;utm_campaign=share-btn_savedevents_share_modal&amp;utm_source=link</a>',
    location:
      "https://www.meetup.com/copenhagen-ethereum-meetup/events/295027739/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    start: "2023-08-14T22:30:00+07:00",
    end: "2023-08-14T23:00:00+07:00",
    timeZone: "Asia/Ho_Chi_Minh",
    createdAt: "2023-08-08T14:21:27.000Z",
    createdBy: "calendar@nearweek.com",
  },
  {
    date: "2023-08-16",
    id: "53gittjj6tvbgn97bnk7uq3v39",
    title: "Popula x NEAR Korea DAO AMA",
    description:
      '<a href="https://link3.to/e/IcoQOv">📣 Popula x NEAR Korea DAO AMA (link3.to)</a>',
    location: "https://link3.to/e/IcoQOv",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    start: "2023-08-16T17:00:00+07:00",
    end: "2023-08-16T18:00:00+07:00",
    timeZone: "Asia/Ho_Chi_Minh",
    createdAt: "2023-08-11T11:00:40.000Z",
    createdBy: "calendar@nearweek.com",
  },
  {
    date: "2023-08-17",
    id: "20bpu5969s0ufc93qai82nse4n",
    title:
      "Wisdom of Experts: A New Approach to Authenticating the Carbon Credit",
    description:
      '<a href="https://www.youtube.com/watch?v=_8dNzoTbcxU">(2) Wisdom of Experts: A New Approach to Authenticating the Carbon Credit - YouTube</a>',
    location: "https://www.youtube.com/watch?v=_8dNzoTbcxU",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    start: "2023-08-17T21:00:00+07:00",
    end: "2023-08-17T22:00:00+07:00",
    timeZone: "Asia/Ho_Chi_Minh",
    createdAt: "2023-08-11T15:53:19.000Z",
    createdBy: "calendar@nearweek.com",
  },
  {
    date: "2023-11-07",
    id: "5b00m6fa9q1h4l7vbrbgr9kr4t",
    title: "NEARCON 2023",
    description:
      'NEARCON 2023: Four paths to explore - Developers, Entrepreneurs, Creators, Regulators.<br><br>Join us in Lisbon from November 7-10.<br><br>Apply to speak at <a href="http://nearcon.org">http://nearcon.org</a><br><br>#NEARCON2023',
    location: "http://nearcon.org",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    end: "2023-11-12",
    createdAt: "2023-06-22T02:17:59.000Z",
    createdBy: "calendar@nearweek.com",
  },
];

const srcData = `
<!DOCTYPE html>
<html>
  <head>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js'></script>
    <script>

      document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'timeGridDay',
          editable: true,
          customButtons: {
            getEvents: {
              text: 'load events',
              click: () => window.top.postMessage({ score: "hello" }, "*")
            }
          },
          headerToolbar: {
            start: 'prev,next today', // will normally be on the left. if RTL, will be on the right
            // center: 'title',
            end: 'timeGridDay list' 
            // end: 'timeGridDay dayGridMonth dayGridWeek dayGridDay list' 
          },
          navLinks: true,
          events: ${JSON.stringify(events)}
        })
        calendar.render()
      })
    </script>
    
  </head>
  <body>
    <div id='calendar'></div>
  </body>
</html>

<style>
html,
body {
  height: 100%;
}

#calendar {
  height: 100%;
}

</style>

`;

return (
  <>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        console.log(data);
      }}
      style={{
        height: "100vh",
        width: "100%",
      }}
    />
  </>
);

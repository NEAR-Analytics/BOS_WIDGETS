// CALENDAR FROM https://github.com/fullcalendar/fullcalendar/tree/main/bundle
const events = [
  {
    date: "2023-07-13",
    id: "22sb70vku4bh4m0o2derf7n3kj",
    title: "Music and video distribution w.Harmonicguild",
    description:
      '<a href="https://twitter.com/i/spaces/1zqJVPBaeldKB?s=20">https://twitter.com/i/spaces/1zqJVPBaeldKB?s=20</a>',
    location: "https://twitter.com/i/spaces/1zqJVPBaeldKB?s=20",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    start: "2023-07-14T00:00:00+07:00",
    end: "2023-07-14T01:00:00+07:00",
    timeZone: "Asia/Ho_Chi_Minh",
    createdAt: "2023-07-13T03:45:39.000Z",
    createdBy: "calendar@nearweek.com",
  },
  {
    date: "2023-07-13",
    id: "5q2dc3c30emckup6fequqrq9bu",
    title: "Near Base in Paris with Meta Pool and Proximity",
    description:
      '<a href="https://twitter.com/i/spaces/1nAKErYeyNYGL?s=20">https://twitter.com/i/spaces/1nAKErYeyNYGL?s=20</a>',
    location: "https://twitter.com/i/spaces/1nAKErYeyNYGL?s=20",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    start: "2023-07-14T04:00:00+07:00",
    end: "2023-07-14T05:00:00+07:00",
    timeZone: "Asia/Ho_Chi_Minh",
    createdAt: "2023-07-11T09:17:56.000Z",
    createdBy: "calendar@nearweek.com",
  },
  {
    date: "2023-07-14",
    id: "31vt2nile9cn25q735u06oghot",
    title: "Near Insider x Paras",
    description:
      '<a href="https://twitter.com/i/spaces/1OyKAVVwvjNGb?s=20">https://twitter.com/i/spaces/1OyKAVVwvjNGb?s=20</a>',
    location: "https://twitter.com/i/spaces/1OyKAVVwvjNGb?s=20",
    groupLabel: "calendar@nearweek.com",
    user: "calendar@nearweek.com",
    color: "#099ce5",
    start: "2023-07-14T20:00:00+07:00",
    end: "2023-07-14T21:00:00+07:00",
    timeZone: "Asia/Ho_Chi_Minh",
    createdAt: "2023-07-12T08:17:15.000Z",
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

const events = props.events || [];
const dateToView = props.date || new Date();

const srcData = `
<!DOCTYPE html>
<html>
  <head>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar/index.global.js'></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar.Calendar(calendarEl, {
          titleFormat: { year: 'numeric', month: 'long', },
          themeSystem: 'bootstrap5',
          initialView: 'dayGridMonth',
          editable: true,
          firstDay: 1,
          buttonText: {
            month: "Month",
            list: "List",
          },
          customButtons: {
            filterBy: {
              text: 'Filter by',
              click: function(e) {
                e.preventDefault();
                window.parent.postMessage(JSON.stringify({ handler: "filter"}), '*');
              }
            },
            addEvent: {
              text: '',
              click: function(e) {
                e.preventDefault();
                window.parent.postMessage(JSON.stringify({ handler: "add-event"}), '*');
              }
            },
            customButton: {
              text: 'Custom Button',
              click: function(e) {
                e.preventDefault();
                window.parent.postMessage(JSON.stringify({ handler: "custom-button"}), '*');
              }
            }
          },
          expandRows: true,
          headerToolbar: {
            start: 'title prev,next dayGridMonth list', // will normally be on the left. if RTL, will be on the right
            center: '',
            end: 'filterBy addEvent customButton' 
          },
          navLinks: true,
          events: ${JSON.stringify(events)},
          eventClick: function(info) {
            info.jsEvent.preventDefault(); // don't let the browser navigate
            window.parent.postMessage(JSON.stringify({ handler: "event-click", data: info.event }), '*');
          },
          viewDidMount: function () {
            var addEvent = document.querySelector('.fc-addEvent-button');
            addEvent.innerHTML = 'Add Event <i class="bi bi-plus-circle-fill" style="color: white; margin-left: 2px;"></i>';
          }
        })
        calendar.render()
        calendar.gotoDate(new Date(${JSON.stringify(dateToView)}))
      })
    </script>
    <style>
      /* Add custom styles here */
      body {
        background: linear-gradient(180deg, orange,white, green);
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
      }
      .footer-img {
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 100px; /* Adjust size as needed */
        height: auto;
      }
    </style>
  </head>
  <body>
    <div id='calendar'></div>
    <!-- Add the image in the footer -->
    <img class="footer-img" src="https://pbs.twimg.com/profile_images/1536928258268090369/hR61y1ae_400x400.jpg" alt="Footer Image">
    <div id='calendar'></div>
  </body>
</html>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        const dataObj = JSON.parse(data);
        switch (dataObj.handler) {
          case "filter": {
            if (props.handleFilter) {
              props.handleFilter();
            }
            break;
          }
          case "add-event": {
            if (props.handleAddEvent) {
              props.handleAddEvent();
            }
            break;
          }
          case "event-click": {
            if (props.handleEventClick) {
              props.handleEventClick(dataObj.data);
            }
            break;
          }
          case "custom-button": {
            if (props.handleCustomButton) {
              props.handleCustomButton();
            }
            break;
          }
        }
      }}
      style={{
        height: "100vh",
        width: "100%",
        border: "none", // Optional: Remove iframe border
      }}
    />
  </>
);

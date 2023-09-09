State.init({
  events: [],
  greating: "Hi",
});

function get_events() {
  const API_URL = "https://nearweek.com/api/google-calendar/events";
  asyncFetch(API_URL, {
    headers: {
      Accept: "*/*",
      Authorization:
        "Bearer 15699f0723aa9fe9f655b1a94e450552476c08807f67b525b5a3c8011eecc8aee6d45923443620f17815b897858be058cd7bd89ddf23a28aabaecb178e7ebc55d380293beeb51a8ce87b40e1518ce4708e4d51a06b115f27fa64ab5cbee5a3511cec785d7ae6a155ecd05ac8196aadae3e9b8e9401b8df8d8b69904f7364f925",
    },
  }).then((res) => {
    // console.log(res.body);
    State.update({
      events: res.body,
    });
    console.log("done");
  });
}

get_events();

const srcData = `
<!DOCTYPE html>
<html>

<head>

    <script src='https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js'></script>
    <style>
        html,
        body {
            height: 100%;
            font-family: Inter, Space Grotesk, Open Sans, sans-serif;
        }

        #calendar {
            height: 100%;
        }
    </style>
    <link rel="stylesheet" href="https://nearweek.com/_next/static/css/83b0e3d8f3a03150.css">
    <link rel="stylesheet" href="https://nearweek.com/_next/static/css/f98edba19df5696e.css">
    <script src="./scripts/raw.js"></script>
    <script>

        document.addEventListener('DOMContentLoaded', function () {
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                timeZone: 'UTC',
                initialView: 'dayGridMonth',
                height: "auto",
                events: ${JSON.stringify(state.events)},
                customButtons: {
                    header: {
                        ariaLabel: 'Do the custom action',
                        text: "COMMUNITY CALENDAR",
                    },
                },
                headerToolbar: {
                    left: "header",
                    center: "",
                    right: "prev,title,next",
                }
            });

            calendar.render();
        })
    </script>

</head>

<body>
    <div class="bg-white">
        <div class="fc-view-front">
            <div id='calendar'></div>
        </div>
    </div>

</body>

</html>
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

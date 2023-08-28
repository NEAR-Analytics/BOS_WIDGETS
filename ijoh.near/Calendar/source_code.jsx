
const holidays = [
    [1, 1],   // New Year's Day
    [3, 1],   // Independence Movement Day
    [5, 5],   // Children's Day
    [6, 6],   // Memorial Day
    [8, 15],  // Liberation Day
    [10, 3],  // National Foundation Day
    [12, 25], // Christmas
];

const Calendar = () => {
    // //const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    // const [notes, setNotes] = useState({});


    State.init({ currentYear: new Date().getFullYear(), currentMonth: new Date().getMonth(), notes: {} });

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    const createCalendar = () => {
        const calendar = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            calendar.push(<div key={`empty-${i}`} className="day"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(currentYear, currentMonth, day);
            const dayOfWeek = currentDate.getDay();
            let dayClasses = 'day';

            if (dayOfWeek === 0) {
                dayClasses += ' sunday';
            } else if (dayOfWeek === 6) {
                dayClasses += ' saturday';
            }

            for (const holiday of holidays) {
                if (currentMonth === holiday[0] - 1 && day === holiday[1]) {
                    dayClasses += ' holiday';
                    break;
                }
            }

            if (notes[`${currentYear}-${currentMonth + 1}-${day}`]) {
                dayClasses += ' active';
            }

            calendar.push(
                <div
                    key={`day-${day}`}
                    className={dayClasses}
                    onClick={() => openNoteInput(currentYear, currentMonth, day)}
                >
                    {day}
                </div>
            );
        }

        return calendar;
    };

    const openNoteInput = (year, month, day) => {
        const existingNote = notes[`${year}-${month + 1}-${day}`] || '';
        const noteInput = prompt(`Enter note for ${year}-${month + 1}-${day}:`, existingNote);

        if (noteInput !== null) {
            // setNotes(prevNotes => ({
            //     ...prevNotes,
            //     [`${year}-${month + 1}-${day}`]: noteInput,
            // }));

            State.update({notes:prevNotes => ({
                ...prevNotes,
                [`${year}-${month + 1}-${day}`]: noteInput,
            })});
        }

    };

    const goToPrevMonth = () => {
        setCurrentMonth(prevMonth => {
            if (prevMonth === 0) {
                // setCurrentYear(year => year - 1);
                // return 11;
                State.update({currentYear:year => year - 1});

            }
            return prevMonth - 1;
        });
        
    };


    const goToNextMonth = () => {
        setCurrentMonth(prevMonth => {
            if (prevMonth === 11) {
                // setCurrentYear(year => year + 1);
                State.update({currentYear:year => year + 1});
                return 0;
            }
            return prevMonth + 1;
        });
    };

    return (
        <div className="calendar">
            <div className="nav-buttons">
                <div className="nav-button" onClick={goToPrevMonth}>← 이전 월</div>
                <div className="nav-button" onClick={goToNextMonth}>다음 월 →</div>
            </div>
            <div className="month-title">{currentYear}년 {currentMonth + 1}월</div>
            <div className="weekdays">
                {["일", "월", "화", "수", "목", "금", "토"].map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>
            <div className="days">
                {createCalendar()}
            </div>
        </div>
    );
};

return Calendar();

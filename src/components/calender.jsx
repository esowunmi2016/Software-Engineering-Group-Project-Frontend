import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

let yourDate = new Date()

const currentDate = yourDate.toISOString().split('T')[0];
const schedulerData = [
  { startDate: '2022-11-16T09:45', endDate: '2022-11-16T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

function Calendar(props) {

    const [view, setView] = useState('Day')

    const viewChange=(currentViewName)=>{
        setView(currentViewName)
    }

    return ( 
        <>
            <Paper style={{height:'100%', width:'100%', display: props.display}}>
                <Scheduler
                data={schedulerData}
                >
                    <ViewState
                        currentDate={currentDate}
                        currentViewName={view}
                        onCurrentViewNameChange={viewChange}
                    />
                    <DayView
                        startDayHour={8}
                        endDayHour={18}
                    />

                    <WeekView
                        startDayHour={8}
                        endDayHour={18}
                    />
                   
                    <MonthView
                        startDayHour={8}
                        endDayHour={18}
                    />

                    <Toolbar />
                    <ViewSwitcher />
                    <Appointments />

                </Scheduler>
            </Paper>
        </>
     );
}

export default Calendar;
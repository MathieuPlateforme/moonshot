import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { IonContent } from "@ionic/react";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { getEventParticipations } from "../../libs/api/event";

const EventCalendar: React.FC<{ previousView: any }> = ({ previousView }) => {
  const [userEvents, setUserEvents] = React.useState<any[]>([]);
  const [calendarData, setCalendarData] = React.useState<any[]>([]);
  const localizer = momentLocalizer(moment);

  const loadEvents = async () => {
    await getEventParticipations({}).then((response) => {
      setUserEvents(response.data);
    });
  };

  useEffect(() => {
    if (userEvents.length === 0) loadEvents();
    if (userEvents.length > 0) {
      let tempData = [];
      for (const event of userEvents) {
        tempData.push({
          title: event.event_data.event_title,
          start: moment(event.event_data.event_start_date.date).toDate(),
          end: moment(event.event_data.event_end_date.date).toDate(),
        });
      }
      setCalendarData(tempData);
    }
  }, [userEvents]);

  return (
    <IonContent fullscreen>
      <a
        onClick={() => {
          previousView(false);
        }}
      >
        <BackArrowIcon color="black" />
      </a>
      <Calendar
        localizer={localizer}
        events={calendarData}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        style={{ height: "95vh" }}
      />
    </IonContent>
  );
};

export default EventCalendar;

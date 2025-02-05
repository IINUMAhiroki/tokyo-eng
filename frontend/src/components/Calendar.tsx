import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';

const locales = {
  'ja': require('date-fns/locale/ja'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    if (selectedDates.length < 3) {
      setSelectedDates([...selectedDates, start]);
    }
    if (selectedDates.length === 2) {
      setIsModalOpen(true);
    }
  };

  return (
    <div style={{ height: '80vh' }}>
      <BigCalendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDates([]);
        }}
        selectedDates={selectedDates}
      />
    </div>
  );
};

export default Calendar;

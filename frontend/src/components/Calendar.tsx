import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addHours from 'date-fns/addHours';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
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

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const Calendar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);  // 既存の予定を管理

  // 営業時間の設定
  const BUSINESS_HOURS = {
    start: 9, // 9:00
    end: 18,  // 18:00
  };

  // 空き時間を見つける関数
  const findAvailableSlots = (date: Date): Date[] => {
    const slots: Date[] = [];
    const dateEvents = events.filter(event =>
      event.start.toDateString() === date.toDateString()
    );

    // 9:00から18:00まで1時間ごとにチェック
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      const slotStart = setMinutes(setHours(new Date(date), hour), 0);
      const slotEnd = addHours(slotStart, 1);

      // この時間枠が既存の予定と重なっていないかチェック
      const isAvailable = !dateEvents.some(event =>
        (slotStart >= event.start && slotStart < event.end) ||
        (slotEnd > event.start && slotEnd <= event.end)
      );

      if (isAvailable) {
        slots.push(slotStart);
      }
    }

    // 最大3つの候補を返す
    return slots.slice(0, 3);
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    const availableSlots = findAvailableSlots(start);
    if (availableSlots.length > 0) {
      setIsModalOpen(true);
      setSelectedDate(start);
    } else {
      alert('この日には空き時間がありません');
    }
  };

  return (
    <div style={{ height: '80vh' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        views={['month']}
      />
      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDate(null);
          }}
          selectedDate={selectedDate}
          availableSlots={findAvailableSlots(selectedDate)}
          onSave={(event) => {
            setEvents([...events, event]);
            setIsModalOpen(false);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;

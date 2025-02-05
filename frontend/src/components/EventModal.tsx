import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  availableSlots: Date[];
  onSave: (event: any) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  availableSlots,
  onSave
}) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const handleSubmit = async () => {
    if (!selectedSlot) {
      alert('時間枠を選択してください');
      return;
    }

    const event = {
      title: eventTitle,
      description: eventDescription,
      start: selectedSlot,
      end: new Date(selectedSlot.getTime() + 60 * 60 * 1000), // 1時間後
    };

    try {
      const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        onSave(event);
        onClose();
      }
    } catch (error) {
      console.error('イベントの作成に失敗しました:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>日程調整</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>説明</Form.Label>
            <Form.Control
              as="textarea"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>候補時間枠</Form.Label>
            {availableSlots.map((slot, index) => (
              <div key={index} className="mb-2">
                <Form.Check
                  type="radio"
                  id={`slot-${index}`}
                  name="timeSlot"
                  label={format(slot, 'M月d日(E) HH:mm', { locale: ja })}
                  onChange={() => setSelectedSlot(slot)}
                  checked={selectedSlot === slot}
                />
              </div>
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          キャンセル
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          保存
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;

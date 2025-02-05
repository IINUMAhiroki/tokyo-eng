import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDates: Date[];
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, selectedDates }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSubmit = async () => {
    const event = {
      title: eventTitle,
      description: eventDescription,
      candidates: selectedDates.map(date => ({
        date: format(date, 'yyyy-MM-dd HH:mm:ss'),
      })),
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
          <Form.Group>
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>説明</Form.Label>
            <Form.Control
              as="textarea"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>候補日</Form.Label>
            {selectedDates.map((date, index) => (
              <div key={index}>
                {format(date, 'yyyy年MM月dd日 HH:mm', { locale: ja })}
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

import React, { useState, useMemo } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import cameraIcon from '../../assets/images/CameraIcon.png';
import './EventForm.css';
import axios from 'axios';

const EventForm = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [eventType, setEventType] = useState('Event Type');
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const toggle = () => setDropDownOpen(!dropDownOpen);

  const handleGoBackToEventsClick = () => {
    history.push('/events');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleEventTypeChange = (eventType) => {
    setEventType(eventType);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="form-container">
      <h2>Create Event</h2>
      <Form>
        <Col>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="titleOfEvent"
              placeholder="title"
              onChange={handleTitleChange}
              value={title}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              onChange={handleDescriptionChange}
              value={description}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              placeholder="price"
              onChange={handlePriceChange}
              value={price}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Upload Image:</Label>
            <br />
            <Label
              id="thumbnail"
              className={thumbnail ? 'has-thumbnail' : ''}
              style={{
                backgroundImage: `url(${preview})`,
                paddingTop: '100px',
                width: '100px',
                height: '100px',
              }}
            >
              <img
                src={cameraIcon}
                alt="Upload icon"
                style={{ maxWidth: '50px' }}
              />
              <Input type="file" onChange={handleThumbnailChange} />
            </Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Event Type: </Label>
            <br />
            <ButtonDropdown isOpen={dropDownOpen} toggle={toggle}>
              <Button id="caret" value={eventType} disabled>
                {eventType}
              </Button>
              <DropdownToggle caret />
              <DropdownMenu>
                <DropdownItem onClick={() => handleEventTypeChange('dancing')}>
                  dancing
                </DropdownItem>
                <DropdownItem onClick={() => handleEventTypeChange('running')}>
                  running
                </DropdownItem>
                <DropdownItem onClick={() => handleEventTypeChange('learning')}>
                  learning
                </DropdownItem>
                <DropdownItem onClick={() => handleEventTypeChange('art')}>
                  art
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Date: </Label>
            <Input
              id="date"
              type="date"
              value={date}
              placeholder="date"
              onChange={handleDateChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <Button size="sm" active>
            Submit
          </Button>{' '}
          <Button size="sm" active onClick={handleGoBackToEventsClick}>
            Go back to events
          </Button>
        </Col>
      </Form>
    </Container>
  );
};
export default EventForm;

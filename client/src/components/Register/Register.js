import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
} from 'reactstrap';
import './Register.css';
import axios from 'axios';

const Register = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = () => {
    history.push('/login');
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/user/register', {
        email,
        password,
        firstName,
        lastName,
      });

      history.push('/events');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="form-container">
      <h2>Register</h2>
      <Form onClick={handleSubmitClick}>
        <Col>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="first name"
              onChange={handleFirstNameChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="last name"
              onChange={handleLastNameChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              onChange={handleEmailChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
          </FormGroup>
        </Col>

        <Col>
          <Button size="sm" active>
            Submit
          </Button>{' '}
          <Button size="sm" active onClick={handleLoginClick}>
            Login instead?
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default Register;

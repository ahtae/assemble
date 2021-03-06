import React, { useContext, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
} from 'reactstrap';
import { UserContext } from '../../userContext';
import authService from '../../services/auth';

const Login = ({ history }) => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = () => {
    history.push('/register');
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    try {
      const data = await authService.login({
        email,
        password,
      });

      const { token, userId } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setIsLoggedIn(true);

      history.push('/events');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="form-container">
      <h2> Login </h2>
      <Form onSubmit={handleSubmitClick}>
        <Col>
          <FormGroup>
            <Label for="email"> Email </Label>
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
            <Label for="password"> Password </Label>
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
          <Button size="sm" active onClick={handleRegisterClick}>
            Register instead?
          </Button>
        </Col>
      </Form>
    </Container>
  );
};
export default Login;

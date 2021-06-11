import React, { useState } from 'react';
import { loginRequest } from '../api/auth';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';
const App = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState('');
  const signInHandler = (event) => {
    event.preventDefault();
    loginRequest({ username, password })
      .then(() => setLoginState('success'))
      .catch(() => setLoginState('failure'));
  };

  return (
    <>
      <div className='main-div'>
        <Col lg='5' md='7'>
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup className='input-group-alternative'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='username'
                      type='name'
                      value={username}
                      onChange={(e) => {
                        setLoginState('');
                        setUserName(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className='input-group-alternative'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>*</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='password'
                      type='password'
                      value={password}
                      onChange={(e) => {
                        setLoginState('');
                        setPassword(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className='button-wrapper'>
                  <Button
                    variant='primary'
                    type='submit'
                    onClick={(event) => signInHandler(event)}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <div className='msg-div'>
            {loginState === 'success' ? (
              <p className='success-msg'>{username} is a valid user</p>
            ) : loginState === 'failure' ? (
              <p className='faliure-msg'>failed to authenticate</p>
            ) : (
              ''
            )}
          </div>
        </Col>
      </div>
    </>
  );
};
export default App;

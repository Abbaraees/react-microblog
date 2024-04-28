import { useEffect, useRef, useState } from 'react';
import Body from '../components/Body';
import { Button, Form } from 'react-bootstrap';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({})
  const usernameField = useRef()
  const passwordField = useRef()

  useEffect(() => {
    usernameField.current.focus()
  }, [])

  const onSubmit = (ev) => {
    ev.preventDefault()
    const username = usernameField.current.value
    const password = passwordField.current.value
    console.log(`You entered ${username}:${password}`)

    const errors = {}
    if (!username) {
      errors.username = 'Username must not be empty'
    }
    if (!password) {
      errors.password = "Password must not be empty"
    }

    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }
  } 

  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name='username'
          label='Username or email address'
          fieldRef={usernameField}
          error={formErrors.username} />
        <InputField
          name='password'
          label='Password'
          type='password'
          fieldRef={passwordField}
          error={formErrors.password} />
        <Button variant='primary' type='submit'>Login</Button>
        
      </Form>
      <hr />
      <p>Don&apos;t have an account? <Link to='/register'>Register Here</Link>!</p>
    </Body>
  );
}
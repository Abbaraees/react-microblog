import { useEffect, useRef, useState } from 'react';
import Body from '../components/Body';
import { Button, Form } from 'react-bootstrap';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({})
  const usernameField = useRef()
  const emailField = useRef()
  const passwordField = useRef()
  const passwordField2 = useRef()

  const api = useApi()
  const navigate = useNavigate()

  useEffect(() => {
    usernameField.current.focus()
  }, [])

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (passwordField.current.value != passwordField2.current.value) {
        setFormErrors({password2: "Passwords don't match"})
    }
    else {
        const data = await api.post('/users', {
            username: usernameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value
        })
        if (!data.ok) {
            setFormErrors(data.body.errors.json)
        }
        else {
            setFormErrors({})
            navigate('/login')
        }
    }
  } 

  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name='username'
          label='Username'
          fieldRef={usernameField}
          error={formErrors.username} />
        <InputField
          name='email'
          label='Email'
          type={'email'}
          fieldRef={emailField}
          error={formErrors.email} />
        <InputField
          name='password'
          label='Password'
          type='password'
          fieldRef={passwordField}
          error={formErrors.password} />
        <InputField
          name='password'
          label='Repeat password'
          type='password'
          fieldRef={passwordField2}
          error={formErrors.password2} />
        <Button variant='primary' type='submit'>Register</Button>
      </Form>
      <hr />
      <p>Already have an account? <Link to='/login'>Login Here</Link>!</p>
    </Body>
  );
}
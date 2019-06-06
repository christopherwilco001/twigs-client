import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/twigs'))
      .catch(() => {
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Form className='form' onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit">Sign In</Button>
      </Form>
    )
  }
}

// <Form.Text className="text-danger mt-3">
//   Do <strong>not</strong> use real emails or passwords. Seriously, don&rsquo;t do it!
// </Form.Text>

export default withRouter(SignIn)

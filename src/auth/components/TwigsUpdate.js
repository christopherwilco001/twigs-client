import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class UpdateTwig extends Component {
  constructor (props) {
    super(props)

    this.state = {
      twig: {
        name: '',
        flex: '',
        shoots: '',
        pattern: ''
      },
      updated: false
    }
  }

  handleUpdate = async event => {
    event.preventDefault()

    await axios({
      url: `${apiUrl}/twigs/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        twig: {
          name: this.state.twig.name,
          flex: this.state.twig.flex,
          shoots: this.state.twig.shoots,
          pattern: this.state.twig.pattern
        }
      }
    })
      .then(response => this.setState({
        updated: true
      }))
      .then(() => this.props.alert(`${this.state.twig.name} twig has been added to the collection!`, 'success'))
      // .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your twig. Please try again.', 'danger')
        this.setState({
          twig: {
            name: '',
            flex: '',
            shoots: '',
            pattern: ''
          }
        })
      })
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value
    }
    const editedTwig = Object.assign(this.state.twig, updatedField)
    this.setState({ twig: editedTwig })
  }
  resetForm = () => this.setState({
    twig: {
      name: '',
      flex: '',
      shoots: '',
      pattern: ''
    }
  })

  render () {
    const { updated } = this.state
    if (updated) {
      return <Redirect to={'/twigs'} />
    }

    return (
      <Form className="form" onSubmit={this.handleUpdate}>
        <h2>Edit Twig:</h2>
        <Form.Group controlId="twigTitle">
          <Form.Control
            type="string"
            value={this.name}
            name="name"
            required
            onChange={this.handleChange}
            placeholder= "Twig Brand"
          />
        </Form.Group>
        <Form.Group controlId="flex">
          <Form.Control
            type="string"
            value={this.flex}
            name="flex"
            required
            placeholder="Enter Flex"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="shoots">
          <Form.Control
            type="string"
            value={this.shoots}
            name="shoots"
            required
            placeholder="Shoots"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="pattern">
          <Form.Control
            type="string"
            value={this.pattern}
            name="pattern"
            required
            placeholder="Blade Pattern"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
      </Form>
    )
  }
}

export default withRouter(UpdateTwig)

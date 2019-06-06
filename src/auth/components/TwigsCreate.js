import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class CreateTwig extends Component {
  constructor () {
    super()

    this.state = {
      twig: {
        name: '',
        flex: '',
        shoots: '',
        pattern: ''
      }
    }
  }

 onCreateTwig = event => {
   event.preventDefault()

   const { alert, history } = this.props
   axios({
     url: apiUrl + '/twigs',
     method: 'POST',
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     },
     data: {
       twig: {
         name: this.state.name,
         flex: this.state.flex,
         shoots: this.state.shoots,
         pattern: this.state.pattern
       }
     }
   })
     .then(() => alert(`You created ${this.state.name} twig!`, 'success'))
     .then(() => history.push('/twigs'))
     .catch(() => {
       this.setState({ name: '', flex: '', shoots: '', pattern: '' })
       alert('Something went wrong, try again', 'danger')
     })
 }

 handleChange = event => this.setState({
   [event.target.name]: event.target.value
 })

 resetForm = () => this.setState({
   name: '',
   flex: '',
   shoots: '',
   pattern: ''
 })

 render () {
   // const { name, flex, shoots, pattern } = this.state

   return (
     <Form className='form' onSubmit={this.onCreateTwig}>
       <h3>Create Twig:</h3>
       <Form.Group controlId="name">
         <Form.Control
           type="text"
           placeholder="Twig Brand"
           required
           name="name"
           value={this.name}
           onChange={this.handleChange}
         />
       </Form.Group>
       <Form.Group controlId="flex">
         <Form.Control
           type="text"
           placeholder="Enter Flex"
           required
           name="flex"
           value={this.flex}
           onChange={this.handleChange}
         />
       </Form.Group>
       <Form.Group controlId="shoots">
         <Form.Control
           type="text"
           placeholder="Shoots"
           required
           name="shoots"
           value={this.shoots}
           onChange={this.handleChange}
         />
       </Form.Group>
       <Form.Group controlId="pattern">
         <Form.Control
           type="text"
           placeholder="Blade Pattern"
           required
           name="pattern"
           value={this.pattern}
           onChange={this.handleChange}
         />
       </Form.Group>
       <Button variant="primary" type="submit" className="m-1">Submit</Button>
     </Form>
   )
 }
}

export default withRouter(CreateTwig)

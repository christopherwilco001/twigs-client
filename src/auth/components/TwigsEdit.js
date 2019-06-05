// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import messages from '../messages'
// class EditTwig extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       twig: null
//     }
//   }
//
//   componentDidMount () {
//     const { alert, user } = this.props
//     axios({
//       url: `${apiUrl}/twigs/`,
//       method: 'GET',
//       headers: {
//         'Authorization': `Token token=${user.token}`
//       }
//     })
//       .then(response => {
//         this.setState({ twig: response.data.twigs })
//       })
//       .catch(error => {
//         console.error(error)
//         alert(messages.updateFailure, 'danger')
//       })
//   }
//
//   handleEdit = (event, id) => {
//     event.preventDefault()
//     const { alert, user } = this.props
//     axios({
//       url: `${apiUrl}/twigs/${id}/`,
//       method: 'PATCH',
//       headers: {
//         'Authorization': `Token token=${user.token}`
//       },
//       data: {
//         twig: {
//           name: this.state.name,
//           flex: this.state.flex,
//           shoots: this.state.shoots,
//           pattern: this.state.pattern
//         }
//       }
//     })
//       .then(() => alert(`You updated ${this.state.name}`, 'success'))
//       .then(() => this.props.history.push('/'))
//       .catch(error => {
//         console.error(error)
//         this.setState({ name: '', flex: '', shoots: '', pattern: '' })
//         alert('Something went wrong, try again', 'danger')
//       })
//   }
//
//   handleChange = event => this.setState({
//     [event.target.name]: event.target.value
//   })
//
//   resetForm = () => this.setState({
//     name: '',
//     flex: '',
//     shoots: '',
//     pattern: ''
//   })
//
//   render () {
//     const { twig } = this.state
//     return (
//       <Form className='form' onSubmit={(e) => this.handleEdit(e, twig.id)}>
//         <h3>Edit:</h3>
//         <Form.Group controlId="name">
//           <Form.Control
//             type="text"
//             placeholder="Twig Brand"
//             required
//             name="name"
//             value={this.name}
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="description">
//           <Form.Control
//             type="text"
//             placeholder="Enter Flex"
//             required
//             name="flex"
//             value={this.flex}
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="rent">
//           <Form.Control
//             type="text"
//             placeholder="Shoots"
//             required
//             name="shoots"
//             value={this.shoots}
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="sale">
//           <Form.Control
//             type="text"
//             placeholder="Blade Pattern"
//             required
//             name="pattern"
//             value={this.pattern}
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Button
//           variant="primary"
//           type="submit"
//           className="m-1"
//         >
//           Submit
//         </Button>
//         <Button
//           variant="danger"
//           type="button"
//           className="m-1"
//           onClick={this.resetForm}
//         >
//           Reset
//         </Button>
//       </Form>
//     )
//   }
// }
//
// export default withRouter(EditTwig)

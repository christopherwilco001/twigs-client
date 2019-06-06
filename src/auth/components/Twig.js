import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
class Twig extends Component {
  constructor () {
    super()

    this.state = {
      twigs: [],
      edit: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/twigs`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ twigs: res.data.twigs })
      })
      .catch(console.error)
  }

 destroy = (id) => {
   axios({
     url: `${apiUrl}/twigs/${id}`,
     method: 'DELETE',
     headers: {
       'Authorization': `Token token=${this.props.user.token}`
     }
   })
     .then(() => {
       axios({
         url: `${apiUrl}/twigs`,
         headers: {
           'Authorization': `Token token=${this.props.user.token}`
         }
       })
         .then(res => {
           this.setState({ twigs: res.data.twigs })
         })
         .then(() => this.props.alert(`${this.state.name} twig has been deleted!`, 'success'))
         .catch(console.error)
     })
 }
 render () {
   const { user } = this.props
   const { twigs } = this.state
   return (
     <Fragment>
       <h3>My Twigs</h3>
       <ListGroup>
         { user && twigs.map(twig => (
           <ListGroup.Item key={twig.id} className= "content">
             <span className="h5 d-block"><strong className= "unit">Name:</strong> <h6> {twig.name}</h6></span>
             <span className="h5 d-block"><strong className= "unit">Flex:</strong>  <h6>{twig.flex}</h6></span>
             <span className="h5 d-block"> <strong className= "unit">Shoots:</strong>  <h6>{twig.shoots}</h6></span>
             <span className="h5 d-block"><strong className= "unit">Pattern:</strong>  <h6>{twig.pattern}</h6></span>

             <Link to={ '/edit-twig/' + twig.id }><Button variant="secondary">Update Twig</Button></Link>

             <Button variant="outline-danger" onClick={() => this.destroy(twig.id)}>Delete Twig</Button>
           </ListGroup.Item>
         )) }
       </ListGroup>
     </Fragment>
   )
 }
}

// { !user && twigs.map(twig => (
//   <ListGroup.Item key={twig.id}>
//     <span className="h5 d-block">  {twig.name}</span>
//     <span>{twig.name}   {twig.flex}</span>
//   </ListGroup.Item>
// ))}

export default Twig

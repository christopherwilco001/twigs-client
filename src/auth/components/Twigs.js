import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
class Twigs extends Component {
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
     <section className="row">
       <h3 className="col-12">My Twigs</h3>
       { user && twigs.map(twig => (
         <div className="col-md-6 col-lg-4" key={twig.id}>
           <div className="content">
             <h5><strong>Name:</strong> </h5>
             <h6> {twig.name}</h6>
             <h5><strong>Flex:</strong>  </h5>
             <h6>{twig.flex}</h6>
             <h5> <strong>Shoots:</strong>  </h5>
             <h6>{twig.shoots}</h6>
             <h5><strong>Pattern:</strong>  </h5>
             <h6>{twig.pattern}</h6>

             <Link to={ '/edit-twig/' + twig.id }><Button variant="dark">Update Twig</Button></Link>

             <Button variant="outline-danger" onClick={() => this.destroy(twig.id)}>Delete Twig</Button>
           </div>
         </div>
       )) }
     </section>
   )
 }
}

// { !user && twigs.map(twig => (
//   <ListGroup.Item key={twig.id}>
//     <span className="h5 d-block">  {twig.name}</span>
//     <span>{twig.name}   {twig.flex}</span>
//   </ListGroup.Item>
// ))}

export default Twigs

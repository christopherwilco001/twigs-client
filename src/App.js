import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import TwigsCreate from './auth/components/TwigsCreate'
import TwigsUpdate from './auth/components/TwigsUpdate'
import Twigs from './auth/components/Twigs'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path='/home' render={() => (
            <p className='text-white'>You <strong>miss</strong> 100% of the shots you <strong>dont</strong> take. -Wayne Gretzky-</p>
          )} />
          <Route exact path='/' render={() => (
            <p className='text-white'>You <strong>miss</strong> 100% of the shots you <strong>dont</strong> take. -Wayne Gretzky-</p>
          )} />
          <AuthenticatedRoute user={user} path='/twigs' render={() => (
            <Twigs user={user} alert={this.alert} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-twig' render={() => (
            <TwigsCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-twig/:id' render={() => (
            <TwigsUpdate alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App

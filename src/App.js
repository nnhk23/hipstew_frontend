// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import TopNav from './components/TopNav'
import Home from './components/Home'
import RenderForm from './components/RenderForm'
import RecipeList from './components/RecipeList'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

class App extends React.Component {

  state={
    user: ''
  }

  renderHome = () => <Home name={this.state.user.name}/>

  renderForm = (routerProps) => {
    switch (routerProps.location.pathname){
      case "/signup" :
        return <div className='login'><RenderForm name="SignUp" handleSubmit={this.handleSignup} /></div>

      case "/login" :
        return <div className='login'><RenderForm name="Login" handleSubmit={this.handleLogin} /></div>

      case "/editprofile" :
        return <div className='login'><RenderForm name="Update" handleSubmit={this.handleUpdate} handleDelete={this.openModal} history={this.props.history}/></div>

      default : break
    }
  }

  handleSignup = (info) => {
    console.log('signup')
    this.handleAuthFetch(info, 'http://localhost:3000/users')
  }

  handleLogin = (info) => {
    console.log('login')
    this.handleAuthFetch(info, 'http://localhost:3000/login')
  }

  handleAuthFetch = (info, request) => {
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: info.name,
        username: info.username,
        password: info.password
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({user: data.user}
        , () => {
        // localStorage.setItem('jwt', data.token)
        this.props.history.push('/')}
      )
    })
  }

  render(){
  return (
    <div className="App">
      <TopNav />

      <div className='Home'>
        <Switch>
          <Route exact path='/' component={this.renderHome} />
          <Route exact path='/login' component={this.renderForm} />
          <Route exact path='/signup' component={this.renderForm} />
          <Route exact path='/editprofile' component={this.renderForm} />
          <Route exact path='/recipes' component={RecipeList} />
        </Switch>
      </div>
    </div>
  );
  }
}

export default withRouter(App);

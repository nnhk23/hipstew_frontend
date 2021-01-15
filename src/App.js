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

  renderHome = () => <Home name={this.state.user.name} />

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
    const data = {
      name: info.name,
      username: info.username,
      password: info.password
    }
    this.handleAuthFetch(data, 'http://localhost:3000/users')
  }

  handleLogin = (info) => {
    console.log('login')
    const data = {
      username: info.username,
      password: info.password
    }
    this.handleAuthFetch(data, 'http://localhost:3000/login')
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: ""}, ()=>{
      this.props.history.push('/login')
    })
  }

  handleAuthFetch = (data, request) => {
    
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( data )
    })
    .then(resp => resp.json())
    .then(data => {
      // debugger
      if(data.error){
        this.handleError(data)
      } else {
        this.setState({user: data.user}
          , () => {
            localStorage.setItem('jwt', data.token)
            this.props.history.push('/')
          }
        )
      }
    })
  }

  handleError = (data) => {
    alert(`${data.error}`)
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      fetch('http://localhost:3000/getuser', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({user: data.user}))
    }
  }

  render(){
  return (
    <div className="App">
      <TopNav handleLogout={this.handleLogout}/>

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

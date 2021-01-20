import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import TopNav from './components/TopNav'
import Home from './components/Home'
import RenderForm from './components/RenderForm'
import Footer from './components/Footer'
import UserIngredient from './components/UserIngredient'
import UserRecipe from './components/UserRecipe'
import DeleteModal from './components/DeleteModal'
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends React.Component {

  state={
    user: '',
    deleteModal: false
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
      .then(data => {
        // debugger
        this.setState({ user: data.user })})
    }
  }

  // render home page
  renderHome = () => <Home user={this.state.user} history={this.props.history} />

  // render login/signup/update form
  renderForm = (routerProps) => {
    switch (routerProps.location.pathname){
      case "/signup" :
        return <div className='login'><RenderForm name="SignUp" handleSubmit={this.handleSignup} /></div>

      case "/login" :
        return <div className='login'><RenderForm name="Login" handleSubmit={this.handleLogin} /></div>

      case "/editprofile" :
        return <div className='login'><RenderForm user={this.state.user} name="Update" handleSubmit={this.handleUpdate} handleDelete={this.openModal} history={this.props.history}/></div>

      default : break
    }
  }

  // render user bookmarked recipes
  renderUserRecipes = () => <UserRecipe recipes={this.state.user.user_recipes} />

  renderUserIngredients = () => <UserIngredient ingredients={this.state.user.user_ingres} />

  dynamicRecipes = (routerProps) => <UserRecipe recipeId={routerProps.match.params.id} />

  handleSignup = (info) => {
    const data = {
      name: info.name,
      username: info.username,
      password: info.password
    }
    this.handleAuthFetch(data, 'http://localhost:3000/users', 'POST')
  }

  handleLogin = (info) => {
    const data = {
      username: info.username,
      password: info.password
    }
    this.handleAuthFetch(data, 'http://localhost:3000/login', 'POST')
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: ""}, ()=>{
      this.props.history.push('/')
    })
  }

  handleUpdate = (info) => {
    const data = {
      name: info.name,
      password: info.password
    }
    this.handleAuthFetch(data, `http://localhost:3000/users/${this.state.user.id}`, 'PATCH')
  }

  handleDelete = () => {
    this.closeModal()
    fetch(`http://localhost:3000/users/${this.state.user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(() => {
      alert('Successfully Delete Account')
      this.handleLogout()
    })
  }

  handleAuthFetch = (data, request, action) => {
    // debugger
    fetch(request, {
      method: action,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( data )
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
        this.handleError(data)
      } else {
        this.setState({user: data.user}
          , () => {
            localStorage.setItem('jwt', data.token)
            this.props.history.push('/')
          })
      }
    })
  }

  handleError = (data) => {
    alert(`${data.error}`)
  }

  // trigger delete confirmation modal
  openModal = () => this.setState({ deleteModal: true })
  closeModal = () => this.setState({ deleteModal: false })

  render(){
  return (
    <div className="App">
      <TopNav handleLogout={this.handleLogout} user={this.state.user}/>

      <div className='Home'>
        <Switch>
          <Route exact path='/' component={this.renderHome} />
          <Route exact path='/login' component={this.renderForm} />
          <Route exact path='/signup' component={this.renderForm} />
          <Route exact path='/editprofile' component={this.renderForm} />
          {/* <Route exact path='/recipes' component={RecipeList} /> */}
          <Route exact path='/useringredients' component={this.renderUserIngredients} />
          <Route exact path='/userrecipes' component={this.renderUserRecipes} />
          <Route path='/userrecipes/:id' component={this.dynamicRecipes} />
        </Switch>
      </div>

      {/* render delete confirmation modal */}
      {this.state.deleteModal ? <DeleteModal closeModal={this.closeModal} show={this.state.deleteModal} handleDelete={this.handleDelete}/> : null}

      <Footer />

    </div>
 
  );
  }
}

export default withRouter(App);

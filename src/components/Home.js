import React from 'react'
import JumbotronNav from './JumbotronNav'
import Footer from './Footer'
import RecipeCarousel from './RecipeCarousel'
import RecipeList from './RecipeList'
import RecipeDetails from './RecipeDetails'


export default class Home extends React.Component {

    state = {
        recipe: 'carousel',
        ingredients: '',
        currentRecipeId: ''
    }

    handleSubmit = (e, ingredients) => {
        e.preventDefault()
        // debugger
        // this.props.history.push('/recipes')
        this.setState({ recipe: 'result', ingredients })
    }

    renderRecipeDetails = (id) => this.setState({ recipe: 'details', currentRecipeId: id})

    handleBackButton = () => this.setState({ recipe: 'result' })

    render(){
        return(
            <div>
                <JumbotronNav name={this.props.user.name} handleSubmit={this.handleSubmit} />

                {this.state.recipe === 'carousel' ? <RecipeCarousel /> : 
                    this.state.recipe === 'result' ? 
                        <RecipeList 
                            ingredients={this.state.ingredients} 
                            key='recipe_list' 
                            renderRecipeDetails={this.renderRecipeDetails} 
                        /> : 
                        <RecipeDetails 
                            userId={this.props.user.id}
                            recipeId={this.state.currentRecipeId} 
                            key={this.state.currentRecipeId} 
                            handleBackButton={this.handleBackButton} 
                        />

                }
                <Footer />
            </div>
        )
    }
}
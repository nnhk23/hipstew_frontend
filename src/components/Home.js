import React from 'react'
import JumbotronNav from './JumbotronNav'
import RecipeCarousel from './RecipeCarousel'
import RecipeList from './RecipeList'
import RecipeDetails from './RecipeDetails'
import IngredientList from './IngredientList'
import '../css/App.css'


export default class Home extends React.Component {

    state = {
        recipe: 'carousel',
        ingredients: '',
        currentRecipeId: null,
        searchType: '',
        recipeSource: ''
    }

    handleSubmit = (e, ingredients, searchType) => { 
        // e.preventDefault()
        // debugger
        this.setState({ recipe: 'result', ingredients , searchType})
    }

    renderRecipeDetails = (id, recipeSource) => this.setState({ recipe: 'details', currentRecipeId: id, recipeSource })

    handleBackButton = () => this.setState({ recipe: 'result' })

    goBackHome = () => window.location.reload()

    render(){
        return(
            <div>
                <JumbotronNav name={this.props.user.name} handleSubmit={this.handleSubmit} />

                {this.state.recipe === 'carousel' ? <RecipeCarousel renderRecipeDetails={this.renderRecipeDetails} /> : 
                    this.state.recipe === 'result' && this.state.searchType === 'recipe' ? 
                        <RecipeList 
                            ingredients={this.state.ingredients} 
                            key='recipe_list' 
                            renderRecipeDetails={this.renderRecipeDetails} 
                            user={this.props.user}
                        /> : 
                            this.state.recipe === 'result' && this.state.searchType === 'ingredient' ? 
                            <IngredientList 
                                ingredient={this.state.ingredients}
                                userId={this.props.user.id}
                            /> :
                            <RecipeDetails 
                                userId={this.props.user.id}
                                recipeId={this.state.currentRecipeId} 
                                key={this.state.currentRecipeId} 
                                handleBackButton={this.state.recipeSource === 'list' ? this.handleBackButton : this.goBackHome} 
                            />
                }
            </div>
        )
    }
}
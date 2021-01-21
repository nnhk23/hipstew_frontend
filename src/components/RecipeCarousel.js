import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../css/RecipeCarousel.css'

export default class RecipeCarousel extends React.Component {

    state = {
        recipes: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/getrandomrecipes')
        .then(resp => resp.json())
        .then(data => this.setState({ recipes: data.recipes }))
    }


    render(){
        return(
            <div className='carousel-holder'>
                {/* render carousel of 5 random recipes */}
                {/* <h1>render carousel</h1> */}
                <Carousel className='carousel-bg'>
                    {this.state.recipes.map(recipe => 
                    
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block carousel-img"
                                src={recipe.image}
                                alt="recipe-slide"
                                onClick={() => this.props.renderRecipeDetails(recipe.id, 'carousel')}
                            />
                            <Carousel.Caption>
                                <h3>{recipe.title}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
                    
            </div>
        )
    }
}
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default class RecipeCarousel extends React.Component {
    render(){
        return(
            <div>
                {/* render carousel of 5 random recipes */}
                <Carousel>

                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src="https://spoonacular.com/recipeImages/659674-556x370.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src="https://spoonacular.com/recipeImages/638343-556x370.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://spoonacular.com/recipeImages/665193-556x370.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://spoonacular.com/recipeImages/716403-556x370.jpg"
                        alt="Forth slide"
                        />
                        <Carousel.Caption>
                        <h3>Forth slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://spoonacular.com/recipeImages/715385-556x370.jpg"
                        alt="Fifth slide"
                        />
                        <Carousel.Caption>
                        <h3>Fifth slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                </Carousel>
            </div>
        )
    }
}
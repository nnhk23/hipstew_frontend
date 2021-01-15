import React from 'react'
import JumbotronNav from './JumbotronNav'
import Footer from './Footer'
import RecipeCarousel from './RecipeCarousel'
import RecipeList from './RecipeList'


export default class Home extends React.Component {

    state = {
        recipe: 'carousel'
    }

    render(){
        return(
            <div>
                <JumbotronNav name={this.props.name} />
                {this.state.recipe === 'carousel' ? <RecipeCarousel /> : <RecipeList />}
                <Footer />
            </div>
        )
    }
}
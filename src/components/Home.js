import React from 'react'
import JumbotronNav from './JumbotronNav'
import Footer from './Footer'
import RecipeCarousel from './RecipeCarousel'
import RecipeList from './RecipeList'


export default class Home extends React.Component {

    render(){
        return(
            <div>
                <JumbotronNav name={this.props.name} />
                <RecipeCarousel />
                <RecipeList />
                <Footer />
            </div>
        )
    }
}
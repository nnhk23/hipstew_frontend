import React from 'react'

export default class RecipeDetails extends React.Component  {

    componentDidMount() {
        fetch(`http://localhost:3000/getrecipedetails?id=${this.props.recipeId}`)
        .then(resp => resp.json())
        .then(data => {
            debugger
        })
    }

    render(){
        return(
            <h1> Rendering Recipe Details </h1>
        )
    }
}

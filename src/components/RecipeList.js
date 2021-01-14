import React from 'react'

export default class RecipeList extends React.Component {
    render(){
        return(
            <div>
                List of recipes based on search term
                {/* render 3 columns of recipes */}
                {/* sorted by fastest prep time/healthiest/cheapest per serving */}
            </div>
        )
    }
}
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/UserIngredient.css'

export default class UserIngredient extends React.Component {

    handleDelete = (e) => {
        fetch(`http://localhost:3000/user_ingres/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            alert('Successfully remove ingredient from list')
            window.location.reload();
        })
    }

    render(){
        return(
            <div className='ingr-card'>
                {this.props.ingredients ? this.props.ingredients.length === 0 ? <h5>Your Fridge is empty :(...</h5> :
                this.props.ingredients.map(ingredient =>
                    <Card style={{ width: '18rem', height: '23rem' }} className='individual-ingr-card' >
                        
                    <Card.Img id='ingr-img-card' variant="top" src={ingredient.img_url} />

                        <Card.Body>
                            <Card.Title onClick={this.handleClick}>{ingredient.name}</Card.Title>
                            <Card.Text>
                                <Button id={ingredient.user_ingre_id} variant='danger' onClick={this.handleDelete}>Remove</Button>
                            </Card.Text>
                        </Card.Body>

                    </Card>
                ) : null}
            </div>
        )
    }
}
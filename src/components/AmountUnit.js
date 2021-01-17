import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ToggleButton from 'react-bootstrap/ToggleButton'

const AmountUnit = ({ currentRecipe }) => {
    const [radioValue, setRadioValue] = useState('1')

    const radios = [
        {name: 'US Unit', value: '1'},
        {name: 'Metric Unit', value: '2'}
    ]

    return(
        <ButtonGroup toggle>
            <DropdownButton 
                id="dropdown-success-button" 
                title={`${currentRecipe.servings} Servings`}
                variant="success"
                size="sm"
            >
                <Dropdown.Item href="#/action-1">{`${currentRecipe.servings} Servings`}</Dropdown.Item>
                <Dropdown.Item href="#/action-2">{`${currentRecipe.servings} Servings`}</Dropdown.Item>
            </DropdownButton>

            {radios.map((radio, idx) => (
                <ToggleButton
                    size="sm"
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}

export default AmountUnit
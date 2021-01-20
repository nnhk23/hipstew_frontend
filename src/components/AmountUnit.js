import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

const AmountUnit = ({ currentRecipe, unitConversion, updateServings, servings }) => {
    const [radioValue, setRadioValue] = useState('us')
    const [servingsAmount, setServingsAmount] = useState(servings)

    const radios = [
        {name: 'US Unit', value: 'us'},
        {name: 'Metric Unit', value: 'metric'}
    ]

    return(
        <ButtonGroup toggle>
            <h5>{currentRecipe.readyInMinutes} minutes</h5>
            {/* <DropdownButton 
                id="dropdown-success-button" 
                title={`${currentRecipe.servings} Servings`}
                variant="success"
                size="sm"
            >
                <Dropdown.Item href="#/action-1">{`${currentRecipe.servings} Servings`}</Dropdown.Item>
                <Dropdown.Item href="#/action-2">{`${currentRecipe.servings} Servings`}</Dropdown.Item>
            </DropdownButton> */}

            <input 
                id='demoInput' 
                type='number' 
                min='0' 
                max='100' 
                value={servings} 
                onChange={(e) => {
                    setServingsAmount(e.target.value)
                    updateServings(e.target.value)
                }}
            />

            {radios.map((radio, idx) => (
                <ToggleButton
                    size="sm"
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                        setRadioValue(e.currentTarget.value)
                        unitConversion(radio.value)
                    }}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}

export default AmountUnit
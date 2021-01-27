import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import '../css/AmountUnit.css'

const AmountUnit = ({ unitConversion, updateServings, servings }) => {
    const [radioValue, setRadioValue] = useState('us')
    const [servingsAmount, setServingsAmount] = useState(servings)

    const radios = [
        {name: 'US Unit', value: 'us'},
        {name: 'Metric Unit', value: 'metric'}
    ]

    return(
        
        <div className='amount-btns'>   
            <ButtonGroup toggle className="mb-2 radio-btn">
                <h5>Servings:</h5>
                <input 
                    id='servingsInput' 
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
                        className='unitToggleBtn'
                        size="sm"
                        key={idx}
                        type="radio"
                        variant="outline-success"
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
        </div>
    )
}

export default AmountUnit
import React, { useState } from 'react'
import './styles.scss'
import { useBus } from 'ts-bus/react'
import { showLoader, showTruthTables } from '../../events'


interface Props {
    onChange: (x: string) => void
    value: string
}
export const LogicStatementInput = (props: Props) => {
    const bus = useBus()
    const [inputText, setValue] = useState("")


    async function onKeyDown(value: string) {
        if (value === "Enter") {
            bus.publish(showTruthTables({ value: inputText }))
            bus.publish(showLoader())
        }
    }

    return (
        <input value={props.value} onChange={({ target: { value } }) => { setValue(value); props.onChange(value) }} onKeyDown={({ key }) => onKeyDown(key)} placeholder="Expression" className="app_input" type="text"></input>
    )

}
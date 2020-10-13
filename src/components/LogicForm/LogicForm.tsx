import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useBus } from 'ts-bus/react';
import { showLoader, showTruthTables } from '../../events';
import { LogicStatementInput } from '../LogicStatementInput/LogicStatementInput'
import { EvaluateButton } from '../StartButton';
import { faLongArrowAltRight, faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

export function LogicForm() {
    const bus = useBus()
    const [value, setValue] = useState("")

    function onChange(value: string) {
        setValue(value)
    }
    function onClick() {
        if (value === '') return
        console.log(value);
        bus.publish(showTruthTables({ value }))
        bus.publish(showLoader())
    }
    function onClickSquareBtn(symbol: string) {
        return function () {
            console.log("CLICK ON", symbol);
            setValue(value + symbol)

        }

    }



    return <div className="form-wrapper">
        <div className="btn-square-wrapper">
            <div onClick={onClickSquareBtn('→')} className="btn-square btn-square--co">
                <FontAwesomeIcon icon={faLongArrowAltRight} />
            </div>
            <div onClick={onClickSquareBtn('↔')} className="btn-square btn-square--bi">
                <FontAwesomeIcon icon={faArrowsAltH} />
            </div>
        </div>
        <LogicStatementInput value={value} onChange={onChange} />
        <EvaluateButton onClick={onClick} />
    </div>
}
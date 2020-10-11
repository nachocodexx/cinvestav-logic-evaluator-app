import React, { useEffect, useState } from 'react'
import { animated, useSpring } from "react-spring";
import { useBus, useBusReducer } from 'ts-bus/react';
import { closeTruthTables, CLOSE_TRUTH_TABLES, hideLoader, SHOW_TRUTH_TABLES } from '../../events';
import './styles.scss';
import { AppLoader } from '../AppLoader/AppLoader';
import { LOGIC_URL } from '../../config';

function sendRequest(expression: string) {
    const fetchOptions: RequestInit = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        }
    }
    return fetch(LOGIC_URL(expression), fetchOptions).then(x => x.json())

}
function reducer(state: any, event: any) {
    switch (event.type) {
        case SHOW_TRUTH_TABLES:
            // console.log(event.payload);
            return { show: true, value: event.payload.value }
        case CLOSE_TRUTH_TABLES:
            return { show: false, value: null }
        default:
            return state
    }
}
const initialState = { show: false, value: null }

interface TruthTableData {
    title: string
    values: number[]
}
interface LogicExpressionResponse {
    expression: string;
    isTautology: boolean;
    isContingency: boolean;
    isSatisfiable: boolean;
    isContradiction: boolean;
    data: TruthTableData[]
}

export function TruthTables() {
    const state = useBusReducer(reducer, initialState)
    const bus = useBus()
    const props = useSpring({ opacity: state.show ? 1 : 0, width: state.show ? '100%' : '0%', height: state.show ? '100%' : '0%', position: 'absolute', top: "0", left: "0" })
    const [data, setData] = useState({} as LogicExpressionResponse)
    const [isRequested, setIsRequested] = useState(false)
    const [isFetched, setIsFetched] = useState(false)



    useEffect(() => {
        if (!state.show || isRequested) return
        setIsRequested(true)
        console.log(state.value);
        sendRequest(state.value).then(x => {
            setData(x); console.log(x);
            setTimeout(() => {

                setIsFetched(true)
            }, 1200)
        })

    }, [setIsFetched, setIsRequested, state, isRequested])

    function onClick() {
        bus.publish(closeTruthTables(null))
        bus.publish(hideLoader())
        setIsFetched(false)
        setIsRequested(false)
    }
    function getTables() {
        // data
        return (data.data).map((x: TruthTableData) => (

            <div key={x.title} className="truth-table">
                <header key={x.title} className="truth-table-header">{x.title}</header>
                <ul className="truth-table-ul">
                    {x.values.map(v => (<li className="truth-table-li" key={Math.random() + "" + v} >{v}</li>))}
                </ul>
            </div>
        ))
    }

    return <animated.div onClick={onClick} className="tables-wrapper" style={props}>
        <div>
            {isFetched ? <header className="tables-wrapper-header">
                <div>
                    <p className="truth-table-question">Is it a tautology? <b>{data.isTautology}</b></p>
                </div>
                <div>
                    <p className="truth-table-question">Is it a contradiction? <b>{data.isContradiction}</b></p>
                </div>
                <div>
                    <p className="truth-table-question">Is it a contingency? <b>{data.isContingency}</b></p>
                </div>
                <div>
                    <p className="truth-table-question">Is it a satisfiable?<b>{data.isSatisfiable}</b></p>
                </div>
            </header> : null}
        </div>

        {isFetched ?
            <div className="truth-tables-wrapper">
                {getTables()}
            </div>
            // div getTables() 
            : null}
        {!isFetched ? <AppLoader /> : null}
    </animated.div>
}
import React from 'react'

interface Props {
    data?: {
        isTautology: string,
        isContradiction: string,
        isContingency: string,
        isSatisfiable: string
    }
}
export function ResultHeader({ data }: Props) {
    if (!data) return (<header className="tables-wrapper-header"></header>)
    return (

        <header className="tables-wrapper-header">
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
        </header>
    )
}
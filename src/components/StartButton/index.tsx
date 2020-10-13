import React from 'react'
import { animated } from 'react-spring'
import './styles.scss'

interface Props {
    onClick: () => void
}
export function EvaluateButton(props: Props) {
    return <animated.button onClick={props.onClick} className="start_button">EVALUATE</animated.button>
}
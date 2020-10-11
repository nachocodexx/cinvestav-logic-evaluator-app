import { createEventDefinition } from "ts-bus";
export const PROCESSING_STATEMENT = 'processing'
export const CANCEL_PROCESSING_STATEMENT = 'cancel_processing'
export const SEND_HTTP_REQUEST = 'send_http'
export const CLICK_ON_START_BUTTON = 'click-start'
export const CLOSE_TRUTH_TABLES = 'close-tables'
export const SHOW_LOADER = 'show-loader'
export const HIDE_LOADER = 'HIDE-loader'
export const SHOW_TRUTH_TABLES = 'show-truthtables'


export const processingStatement = createEventDefinition<{
    statement: string
}>()(PROCESSING_STATEMENT)
export const cancelProcessingStatement = createEventDefinition<null>()(CANCEL_PROCESSING_STATEMENT)


export const clickOnStartButton = createEventDefinition<null>()(CLICK_ON_START_BUTTON)
export const showTruthTables = createEventDefinition<{ value: string }>()(SHOW_TRUTH_TABLES)
export const closeTruthTables = createEventDefinition<null>()(CLOSE_TRUTH_TABLES)
export const showLoader = createEventDefinition()(SHOW_LOADER)
export const hideLoader = createEventDefinition()(HIDE_LOADER)

export const sendHttpRequest = createEventDefinition<{
    id: string
}>()(SEND_HTTP_REQUEST)
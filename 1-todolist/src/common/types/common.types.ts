export type ResponseType<T = {}> = {
    messages: string[]
    resultCode: number
    data: T
    fieldsErrors: FieldErrorType[]
}

export type FieldErrorType = {
    error: string
    field: string
}

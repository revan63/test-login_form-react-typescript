export interface IFormModel {
    email: string
    emailValid: boolean
    password: string
    name?: string
}

export interface ITab {
    text: string
    key: string
}

export interface IInputItem {
    key: string
    type: string
    label: string
}

export interface IFormProp {
    value: IFormModel
    change: any
    inputs: Array<IInputItem>
    type: string
}

export interface IResetProp {
    email: string
    validEmail?: boolean
}

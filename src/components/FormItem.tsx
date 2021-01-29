import React from 'react';
import { IFormProp } from '../interfaces';

const FormItem: React.FC<IFormProp> = (props: IFormProp) => {
    const {
        value,
        change,
        inputs,
        type
    } = props;

    const onChange = (key: string) => (event: any) => {
        change({
            ...value,
            ...{
                [key]: event.target.value,
                ...(
                    (key === 'email') ?
                        { emailValid: event.target.validity.valid } :
                        {}
                )
            }
        })
    };

    return (
        <div className={`form-${type}`}>
            {
                inputs.map(input => (
                    <div
                        key={`form-${type}-${input.key}`}
                        className="input-wrap">
                        <label>{input.label}</label>
                        <input
                            type={input.type}
                            value={(value as any)[input.key]}
                            onChange={onChange(input.key)}
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default FormItem;

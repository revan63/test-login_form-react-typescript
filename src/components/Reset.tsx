import React, { useState } from 'react';
import { IResetProp } from '../interfaces';

const Reset: React.FC<IResetProp> = (props: IResetProp) => {
    const { email } = props;
    let [resetEmail, setResetEmail] = useState<IResetProp>({
        email: email,
        validEmail: false
    });
    let [isLoading, setIsLoading] = useState(false);

    const onChange = (event: any) => {
        setResetEmail({
            email: event.target.value,
            validEmail: event.target.validity.valid
        });
    };
    const onClick = () => {
        fetch('//localhost:3000/reset')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                alert(`success: ${data}`);
            })
            .catch((err) => {
                alert(`error: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
                setResetEmail({
                    email: '',
                    validEmail: false
                });
            });
    };

    return (
        <div className="form-reset-wrap">
            <div className="form-reset">
                <h2>Восстановление пароля</h2>
                <div
                    key="form-reset"
                    className="input-wrap">
                    <label>E-mail</label>
                    <input
                        type="text"
                        value={resetEmail.email}
                        onChange={onChange}
                    />
                </div>
                <button
                    disabled={isLoading}
                    className="form-button btn-primary"
                    onClick={onClick}
                >
                    Восстановить пароль
                </button>
            </div>
        </div>
    );
}

export default Reset;

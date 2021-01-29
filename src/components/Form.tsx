import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
    IFormModel,
    IFormProp,
    IInputItem,
    IResetProp,
    ITab
} from '../interfaces';
import './Form.css';

import FormItem from './FormItem';
import Reset from './Reset';

enum formTypes {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    RESET = 'reset'
}

const loginInputList: Array<IInputItem> = [
    {
        key: 'email',
        type: 'email',
        label: 'E-mail'
    },
    {
        key: 'password',
        type: 'password',
        label: 'Пароль'
    }
];

const registrationInputList: Array<IInputItem> = [
    {
        key: 'email',
        type: 'email',
        label: 'E-mail'
    },
    {
        key: 'password',
        type: 'password',
        label: 'Пароль'
    },
    {
        key: 'name',
        type: 'text',
        label: 'Имя'
    }
];

const tabs: Array<ITab> = [
    {
        text: 'Логин',
        key: formTypes.LOGIN
    },
    {
        text: 'Регистрация',
        key: formTypes.REGISTRATION
    }
];

const Form: React.FC = () => {
    let location = useLocation();
    let { pathname } = location;
    let [formType, setFormType] = useState<string>(pathname.length > 0 ? pathname : formTypes.LOGIN);

    let [isLoading, setIsLoading] = useState<boolean>(false);
    let [loginInputs, setLoginInputs] = useState<IFormModel>({
        email: '',
        password: '',
        emailValid: false
    });
    let [registrationInputs, setRegistrationInputs] = useState<IFormModel>({
        email: '',
        password: '',
        name: '',
        emailValid: false
    });

    const loginProps: IFormProp = {
        value: loginInputs,
        change: setLoginInputs,
        inputs: loginInputList,
        type: formTypes.LOGIN
    };
    const registrationProps: IFormProp = {
        value: registrationInputs,
        change: setRegistrationInputs,
        inputs: registrationInputList,
        type: formTypes.REGISTRATION
    };
    const resetProps: IResetProp = useMemo(() => ({
        email: loginInputs.email
    }), [loginInputs]);

    const validate = (formType: string): boolean => {
        const inputs = formType === formTypes.LOGIN ? loginInputs : registrationInputs;

        return !(Object.keys(inputs).reduce((acc, key) => (
            key === 'emailValid' ?
                acc && inputs[key] :
                acc && !!(inputs as any)[key].length
        ), true));
    };
    const formIsValid = validate(formType);


    const setTab = (key: string) => () => {
        setFormType(key);
    };

    const onClick = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        fetch(`//localhost:3000/${formType}`)
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
                
                if (formType === formTypes.LOGIN) {
                    setLoginInputs({
                        email: '',
                        password: '',
                        emailValid: false
                    });
                } else {
                    setRegistrationInputs({
                        email: '',
                        password: '',
                        emailValid: false,
                        name: ''
                    });
                }
            })
    };

    useEffect(() => {
        let { pathname } = location;
        setFormType(pathname.length > 1 ? pathname.slice(1) : formTypes.LOGIN);


        if (loginInputs.email.length && loginInputs.emailValid) {
            resetProps.email = loginInputs.email;
        }
        
    }, [location, loginInputs, resetProps]);

    return (
        <form className="form">
            {
                formType === formTypes.RESET ?
                    (
                        <div>
                            <Reset {...resetProps} />
                        </div>
                    ) :
                    (
                        <div>
                            <div className="form-tabs">
                                {
                                    tabs.map((tab: ITab) => {
                                        const activeClass: string = tab.key === formType ? ' active' : '';

                                        return (
                                            <Link
                                                to={`/${tab.key}`}
                                                className={"form-tabs-item" + activeClass}
                                                key={`form-${tab.key}`}
                                                onClick={setTab(tab.key)}
                                            >
                                                {tab.text}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            {
                                formType === formTypes.REGISTRATION ?
                                    <FormItem {...registrationProps} /> :
                                    <FormItem {...loginProps} />
                            }
                            {formType === formTypes.LOGIN && (
                                <Link
                                    to="/reset"
                                    className="form-link"
                                    onClick={setTab(formTypes.RESET)}
                                >
                                    Забыли пароль?
                                </Link>
                            )}
                            <hr />
                            <button
                                disabled={formIsValid || isLoading}
                                className="form-button btn-primary"
                                onClick={onClick}>
                                {formType === formTypes.REGISTRATION ? 'Зарегистрироваться' : 'Войти'}
                            </button>
                        </div>
                    )
            }
        </form>
    );
}

export default Form;

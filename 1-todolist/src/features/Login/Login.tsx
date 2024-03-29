import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import * as authSelectors from './authSelectors'
import {authThunks} from "features/Login/auth-reducer";
import {FieldErrorType} from "common/types";
import {useActions} from "common/hooks";
import {LoginParamsType} from "features/Login/auth-api";
import s from './Login.module.css'

export const Login = () => {
    const {login} = useActions(authThunks)
    const isLoggedIn = useSelector(authSelectors.isLoggedIn)
    const captchaUrl = useSelector(authSelectors.captcha)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: undefined
        },
        validate: (values) => {
            const errors: Partial<LoginParamsType> = {};
            if (!values.email) {
                errors.email = 'Email is required*';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required*';
            } else if (values.password.length < 4) {
                errors.password = 'Must be characters 4 or more';
            }
            return errors;
        },
        onSubmit: (values, formikHelpers) => {
            login({...values})
                .unwrap()
                .catch((reason) => {
                    const {fieldsErrors} = reason
                    if (fieldsErrors) {
                        fieldsErrors.forEach((el: FieldErrorType) => {
                            formikHelpers.setFieldError(el.field, el.error)
                        })
                    }
                })
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    const errorStyle = {
        color: '#d32f2f'
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                                   error={!!formik.errors.email && formik.touched.email}
                        />
                        <span style={errorStyle}>{formik.errors.email}</span>
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   error={!!formik.errors.password && formik.touched.password}
                                   {...formik.getFieldProps('password')}/>
                        <span style={errorStyle}>{formik.errors.password}</span>
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox checked={formik.values.rememberMe}
                                                             {...formik.getFieldProps('rememberMe')}/>}
                        />
                        {captchaUrl !== null && <div className={s.captchaContainer}><img src={captchaUrl}/>
                            <TextField type="text"
                                       label="captcha"
                                       margin="normal"
                                       {...formik.getFieldProps('captcha')}/></div>}
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
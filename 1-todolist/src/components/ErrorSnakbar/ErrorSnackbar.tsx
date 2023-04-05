import { Snackbar} from "@mui/material";
import React from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {appAction} from "app/appReducer";
import * as errorSelectors from './errorSnackbarSelectors'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  const  CustomizedSnackbars = () => {
    const error = useSelector(errorSelectors.error)
    const dispatch = useDispatch();
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appAction.setError({error: null}))
    };

    return (
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose} style={{position: 'absolute'}}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>

    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
    const title = props.title;
    const cancelButtonText = props.cancelButtonText;
    const submitButtonText = props.submitButtonText;

    const CloseHandler = () => {
        props.onClose();
    };

    const SubmitHandler = () => {
        props.onSubmit();
    };

    return (
        <>
            <Dialog open={props.open} onClose={CloseHandler}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={CloseHandler}>{cancelButtonText}</Button>
                    <Button onClick={SubmitHandler}>{submitButtonText}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
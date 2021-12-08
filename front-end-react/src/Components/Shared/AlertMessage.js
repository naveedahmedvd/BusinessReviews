import * as React from 'react';
import FlashMessage from 'react-flash-message'
import './shared.css'

export default function AlertMessage(props) {

    const { cssClass, message, visible } = props

    return (
        <div>
            {
                visible &&
                <FlashMessage duration={5000} persistOnHover={true}>
                    <strong className={cssClass+' message'} >{message}</strong>
                </FlashMessage>
            }
        </div>
    );
}
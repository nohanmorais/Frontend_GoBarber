
import React, { useEffect } from 'react';

import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../context/ToastContext';

import { Container } from './styles';

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const icons = {
    info: <FiInfo size={24}></FiInfo>,
    error: <FiAlertCircle size={24}></FiAlertCircle>,
    success: <FiCheckCircle size={24}></FiCheckCircle>,
};

const Toast: React.FC<ToastProps> = ( { message, style }) => {
   
    const {removeToast} = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };

    }, [removeToast, message.id]);

    return (
        <Container type={message.type} 
        hasDescription={!!message.description}
        style={ style }>

            {icons[ message.type || 'info' ] }

                <div>
                    <strong>{message.title}</strong>
                    {message.description && <p>{message.description}</p>}
                </div>    
                <button onClick={() => removeToast(message.id)} type="button">
            <FiXCircle  size={18} />
                </button>

        </Container>
    );
}

export default Toast;
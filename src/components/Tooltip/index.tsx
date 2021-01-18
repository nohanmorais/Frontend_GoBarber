import React from 'react';

import { Container } from './styles';

interface TooltipProps {
    title: string;
    ClassName?: string;
}


const Tooltip: React.FC<TooltipProps> = ({ title, ClassName='', children }) => {
    return (
    
        <Container className={ClassName}> 
            {children}
            <span>{title}</span>
        </Container>
    );
}

export default Tooltip;
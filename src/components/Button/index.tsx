import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProp =  ButtonHTMLAttributes<HTMLButtonElement>;



const Button: React.FC<ButtonProp> = ({children, ...rest}) => (
    <Container type="button" {...rest}>{children}</Container>
);

export default Button;
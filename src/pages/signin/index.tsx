import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';


import { Container, Content, Background, AnimationContainer } from './styles';
import logoimg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import getValidationError from '../../utils/getValidationErrors';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

interface SignInFormData {
    email: string;
    password: string;
}


const Signin: React.FC = () =>  {

    const formRef = useRef<FormHandles>(null);

    const {  signIn  } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback( async (data: SignInFormData) => {
        console.log(data);
        try {
            formRef.current?.setErrors({ });

            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('e-mail deve estar no padrao (xxx@xxx.com)'),
                password: Yup.string().required('Senha Obrigatória'),
            });

            await schema.validate(data, { abortEarly: false});

            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');

        } catch (error) {
            console.log(error);
            if(error instanceof Yup.ValidationError) {
                const errors = getValidationError(error)

                formRef.current?.setErrors(errors);

                return;
            
        }
        
        addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Ocorreu um erro ao fazer login',
        });

        }
    }, [ signIn, addToast, history ]);
    
    return ( 
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoimg} alt="LogoGoBarber"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu Logon</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail"/>
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        <Button type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );

};

export default Signin;
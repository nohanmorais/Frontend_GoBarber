import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import logoimg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

interface SignupFormData {
    name: string,
    email: string,
    password: string,
}


const Signup: React.FC = () =>  {
    
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback( async (data: SignupFormData) => {
        console.log(data);
        try {
            formRef.current?.setErrors({ });

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, { abortEarly: false});

            await api.post('/users', data);
            
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro  Realizado com sucesso!',
                description: 'Você ja pode fazer seu LogOn',
            })

        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                const errors = getValidationError(error)

                formRef.current?.setErrors(errors);

                return;   
        }
        
        addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer o cadastro ',
        });
        }
    }, [ addToast, history]);

    return(
    <Container>
        <Background />
        <Content>
            <AnimationContainer>
                <img src={logoimg} alt="LogoGoBarber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome"/>
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar Para Logon            
                </Link>
            </AnimationContainer>
        </Content>
    </Container>
);}

export default Signup;
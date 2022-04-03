import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [validated, setValidated] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            axios.post('https://mypetshop4.herokuapp.com/api/auth/login', {
                email,
                password
            })
                .then(res => {
                    if(res.data.user.permission === 'Admin'){
                        window.location = '/admin';
                    }else 
                        if(res.data.user.permission === 'Nhân viên'){
                            localStorage.setItem('emp_token', res.data.accessToken);
                            window.location = '/dashboard';
                        }else{
                            localStorage.setItem('cus_token', res.data.accessToken);
                            window.location = '/';
                        }
                })
                .catch(err => {
                    window.alert('Email hoặc mật khẩu không đúng!!!');
                });
        }
        
        setValidated(true);
    };

    useEffect(() => {
        document.title = 'Login Page';
    }, [])

    return(
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.formLogin)}>
                <div className={clsx(styles.title)}>
                    <h5>Đăng nhập</h5>
                    <hr />
                </div>
                <div className={clsx(styles.content)}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={handleEmail} required />
                                <Form.Control.Feedback type="invalid">
                                    Email không hợp lệ.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-5">
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control type="password" placeholder="Mật khẩu" onChange={handlePassword} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập mật khẩu.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit">Đăng nhập</Button>{' '}
                        <span>Chưa có tài khoản?</span>
                        <Link to='/register'>Đăng ký</Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}
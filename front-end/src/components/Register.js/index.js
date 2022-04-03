import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';

export default function Register(){
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [validated, setValidated] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

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
            axios.post('https://mypetshop4.herokuapp.com/api/auth/register', {
                name,
                email,
                password,
                phone,
            })
                .then(res => {
                    window.alert('Đăng ký tài khoản thành công.');
                    window.location = '/login';
                })
                .catch(err => {
                    window.alert('Email đã tồn tại.');
                });
        }
        
        setValidated(true);
    };

    useEffect(() => {
        document.title = 'Register Page';
    }, [])

    return(
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.formLogin)}>
                <div className={clsx(styles.title)}>
                    <h5>Đăng ký</h5>
                    <hr />
                </div>
                <div className={clsx(styles.content)}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Họ tên</Form.Label>
                                <Form.Control type="text" placeholder="Họ tên" onChange={handleName} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập họ tên.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" placeholder="0123456789" pattern='0[1-9][0-9]{8}' onChange={handlePhone} required />
                                <Form.Control.Feedback type="invalid">
                                    Số điện thoại không hợp lệ.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={handleEmail} required />
                                <Form.Control.Feedback type="invalid">
                                    Email không hợp lệ.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control type="password" placeholder="Mật khẩu" onChange={handlePassword} required />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập mật khẩu.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit">Đăng ký</Button>{' '}
                        <span>Đã có tài khoản?</span>
                        <Link to='/login'>Đăng nhập</Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}
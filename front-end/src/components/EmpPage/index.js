import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import styles from './EmpPage.module.css';
import MyCategories from '../MyCategories';
import MyProducts from '../MyProducts';
import Orders from '../Orders';
import CreateProduct from '../CreateProduct';
import EditProduct from '../EditProduct';
import Info from '../Info';

export default function EmpPage(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [phone, setPhone] = useState();
    const [birth, setBirth] = useState();
    const [gender, setGender] = useState();
    const [permission, setPermission] = useState();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('emp_token');
        window.location = '/login';
    }

    useEffect(() => {
        document.title = 'My Dashboard';

        axios.get('https://mypetshop4.herokuapp.com/api/users/profile', {
            headers: {
                x_authorization: localStorage.getItem('emp_token')
            }
        })
            .then(res => {
                setAvatar(res.data.avatar);
                setEmail(res.data.email);
                setName(res.data.name);
                setPermission(res.data.permission);
                setPhone(res.data.phone);
                setBirth(res.data.birth);
                setGender(res.data.gender);
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand style={{marginLeft: '-50px'}}><Link to='/dashboard' style={{textDecoration: 'none', color: 'white'}}>Dashboard</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <div className={clsx(styles.avatar)}>
                                    <img className={clsx(styles.image)} src={avatar} alt='' />
                                </div>
                                <NavDropdown title={name} id="collasible-nav-dropdown">
                                    <div className={clsx(styles.email)}>{email}</div>
                                    <NavDropdown.Item href='/dashboard'>Xem thông tin</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.nav)}>
                    <ul className={clsx(styles.menuList)}>
                        <li style={{marginBottom: '10px'}}><Link className={clsx(styles.menu)} to='my-categories'>Danh mục</Link></li>
                        <li style={{marginBottom: '10px'}}><Link className={clsx(styles.menu)} to='my-products'>Sản phẩm</Link></li>
                        <li style={{marginBottom: '10px'}}><Link className={clsx(styles.menu)} to='orders'>Đơn hàng</Link></li>
                    </ul>
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.container)}>
                        <Routes>
                            <Route index element={
                                <Info
                                name={name}
                                email={email}
                                avatar={avatar}
                                phone={phone}
                                birth={birth}
                                gender={gender}
                                permission={permission}
                                />
                            } />
                            <Route path="my-categories" element={<MyCategories />} />
                            <Route path="my-products" element={<MyProducts />} />
                            <Route path="create-product" element={<CreateProduct />} />
                            <Route path="edit-product/:id" element={<EditProduct />} />
                            <Route path="orders" element={<Orders />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}
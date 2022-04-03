import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";  
import { FaShoppingCart } from "react-icons/fa";  
import { Nav, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Header.module.css';

export default function Header({ categories }){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [scroll, setScroll] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('cus_token');
        window.location.reload();
    }

    useEffect(() => {
        if(localStorage.getItem('cus_token')){
            axios.get('https://mypetshop4.herokuapp.com/api/users/profile', {
                headers: {
                    x_authorization: localStorage.getItem('cus_token')
                }
            })
                .then(res => {
                    setAvatar(res.data.avatar);
                    setEmail(res.data.email);
                    setName(res.data.name);
                })
                .catch(err => console.log(err));
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 90){
                setScroll(true);
            }else{
                setScroll(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
        
    }, [])

    return(
        <div className={clsx(styles.header)}>
            <div id='top-header' className={clsx(styles.topHeader)}>
                <div className={clsx(styles.logo)}>
                    <img src="https://res.cloudinary.com/petshop347/image/upload/v1648282327/logo_lrvjoe.jpg" alt='' className={clsx(styles.image)} />
                    <Link to='/' className={clsx(styles.title)}><h2>PET SHOP</h2></Link>
                </div>
                <div className={clsx(styles.search)}>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Chức năng này đang trong quá trình cài đặt..."
                    />
                    <div style={{marginLeft: '10px'}}><Link to='#'><FaSearch /></Link></div>
                </div>
                <div>
                    <Link style={{textDecoration: 'none'}} to='/admin'>ADMIN PAGE</Link>
                </div>
            </div>
            <div className={clsx(styles.navbar, { [styles.fixedNavbar]: scroll })}>
                <div className={clsx(styles.content)}>
                    <ul className={clsx(styles.listMenu)}>
                        <li>
                            <Link to="/" className={clsx(styles.itemMenu)}>Trang chủ</Link>
                        </li>
                        {
                            categories.map(category => {
                                return(
                                    <li key={category._id}>
                                        <Link to={`/categories/${category._id}`} className={clsx(styles.itemMenu)}>{category.title}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div className={clsx(styles.cart)}><Link to='/my-cart' className={clsx(styles.cartIcon)}><FaShoppingCart /></Link></div>
                    <div className={clsx(styles.login)}>
                        {localStorage.getItem('cus_token') ? (
                            <Nav style={{marginTop: '-10px', textTransform: 'none'}}>
                                <NavDropdown title={name} id="collasible-nav-dropdown">
                                    <div className={clsx(styles.email)}>{email}</div>
                                    <NavDropdown.Item href="#">Thông tin cá nhân</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Đơn hàng của tôi</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                                <div className={clsx(styles.avatar)}>
                                    <img className={clsx(styles.myImage)} src={avatar} alt='' />
                                </div>
                            </Nav>
                        ) : (
                            <Link to='/login' className={clsx(styles.loginText)}>Đăng nhập</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
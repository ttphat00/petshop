import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './Info.module.css';

export default function Info({ name, email, phone, avatar, birth, gender, permission }){
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/products/my-products', {
            headers: {
                x_authorization: localStorage.getItem('emp_token')
            }
        })
            .then(res => {
                setMyProducts(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <>
            <div className={clsx(styles.avatar)}>
                <img style={{width: '100%', height: '100%', borderRadius: '50%'}} src={avatar} alt='' />
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.left)}>
                    <p>
                        <b>Tên người dùng: </b>{name}<br />
                        <b>Email: </b>{email}<br />
                        <b>Phone: </b>{phone}<br /><br />
                        <b>Sản phẩm đã tạo: </b><b style={{color: '#f68930', fontSize: '25px'}}>{myProducts.length}</b>
                    </p>
                </div>
                <div className={clsx(styles.right)}>
                    <p>
                        <b>Ngày sinh: </b>{birth}<br />
                        <b>Giới tính: </b>{gender}<br />
                        <b>Chức vụ: </b>{permission}
                    </p>
                </div>
            </div>
        </>
    );
}
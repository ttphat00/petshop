import React, { useEffect, useState } from 'react';
import clsx from "clsx";
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from "react-icons/fa";
import styles from './Cart.module.css';
import Header from "../Header";
import Footer from "../Footer";

export default function Cart(){
    let totalCost = 0;
    const [changed, setChanged] = useState(false);
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleSubmit = () => {
        window.alert('Chức năng này đang được cài đặt...');
    }

    const handleIncrease = (id, idp, qp) => {
        let quantity = 0;
        let cost = 0;

        products.map(prod => {
            if(idp === prod._id){
                quantity = prod.quantity;
                cost = prod.cost;
            }
        })

        if(qp !== quantity){
            axios.put(`https://mypetshop4.herokuapp.com/api/carts/${id}`, {
                quantityPurchased: qp+1,
                sumCost: (qp+1)*cost
            }, 
            {
                headers: {
                    x_authorization: localStorage.getItem('cus_token')
                }
            })
                .then(res => {
                    setChanged(!changed);
                })
                .catch(err => console.log(err));
        }
    }

    const handleDecrease = (id, idp, qp) => {
        if(qp !== 1){
            let cost = 0;

            products.map(prod => {
                if(idp === prod._id){
                    cost = prod.cost;
                }
            })

            axios.put(`https://mypetshop4.herokuapp.com/api/carts/${id}`, {
                quantityPurchased: qp-1,
                sumCost: (qp-1)*cost
            }, 
            {
                headers: {
                    x_authorization: localStorage.getItem('cus_token')
                }
            })
                .then(res => {
                    setChanged(!changed);
                })
                .catch(err => console.log(err));
        }
    }

    const handleDelete = (id) => {
        const mess = window.confirm('Bạn muốn bỏ sản phẩm này ra khỏi giỏ hàng?');
        if(mess){
            axios.delete(`https://mypetshop4.herokuapp.com/api/carts/${id}`, {
                headers: {
                    x_authorization: localStorage.getItem('cus_token')
                }
            })
                .then(res => {
                    setChanged(!changed);
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`https://mypetshop4.herokuapp.com/api/carts/my-cart`, {
            headers: {
                x_authorization: localStorage.getItem('cus_token')
            }
        })
            .then(res => {
                setCart(res.data);
            })
            .catch(err => console.log(err));
    }, [changed])

    return (
        <>
            <Header categories={categories} />
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.cart)}>
                    <h6>Bạn có {cart.products && cart.products.length} sản phẩm trong giỏ</h6>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sản phẩm trong giỏ</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.products && cart.products.map(product => {
                                    totalCost += product.sumCost;
                                    return(
                                        <tr key={product._id}>
                                            {
                                                products.map(prod => {
                                                    if(product.idProduct === prod._id){
                                                        return(
                                                            <React.Fragment key={prod._id}>
                                                                <td><img style={{width: '40px', height: '40px'}} src={prod.images[0].url} alt='' />{prod.productName}</td>
                                                                <td>{prod.cost}</td>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                })
                                            }
                                            <td>
                                                <Button variant='light' onClick={() => {handleDecrease(product._id, product.idProduct, product.quantityPurchased)}}>-</Button>
                                                <input style={{width: '70px'}} type='text' value={product.quantityPurchased} readOnly />
                                                <Button variant='light' onClick={() => {handleIncrease(product._id, product.idProduct, product.quantityPurchased)}}>+</Button>
                                            </td>
                                            <td>{product.sumCost}</td>
                                            <td><Button variant='light' onClick={() => {handleDelete(product._id)}}><FaTimes /></Button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div className={clsx(styles.total)}>
                            <div className={clsx(styles.row)}>
                                <div><b>Tổng tiền:</b></div>
                                <div>{totalCost} đ</div>
                            </div>
                            <hr />
                            <div className={clsx(styles.row)}>
                                <div><b>Thành tiền:</b></div>
                                <div><b>{totalCost} đ</b></div>
                            </div>
                            <Button className='mt-4 mb-5' variant='warning' onClick={handleSubmit}>Thực hiện thanh toán</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
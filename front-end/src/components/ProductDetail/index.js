import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Carousel } from "react-bootstrap";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import styles from './ProductDetail.module.css';
import Header from '../Header';
import Footer from '../Footer';

export default function ProductDetail(){
    const { id } = useParams();
    const description = useRef();
    const quantity = useRef([]);
    const [quantityPurchased, setQuantityPurchased] = useState(1);
    const [sumCost, setSumCost] = useState();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);

    const handleBuyNow = () => {
        window.alert('Chức năng này đang được cài đặt...');
    }

    const handleAddToCart = () => {
        axios.get(`https://mypetshop4.herokuapp.com/api/carts/my-cart`, {
            headers: {
                x_authorization: localStorage.getItem('cus_token')
            }
        })
            .then(res => {

                let found = false;
                for(let i=0; i<res.data.products.length; i++){
                    if(id === res.data.products[i].idProduct){
                        found = true;
                        break;
                    }
                }

                if(found){
                    window.alert('Sản phẩm này đã có trong giỏ hàng rồi!!!');
                }else{

                    axios.post(`https://mypetshop4.herokuapp.com/api/carts/${id}`, {
                        quantityPurchased,
                        sumCost
                    },
                    {
                        headers: {
                            x_authorization: localStorage.getItem('cus_token')
                        }
                    })
                        .then(res => {
                            window.alert('Đã thêm vào giỏ hàng.');
                        })

                }

            })
            .catch(err => console.log(err));
    }

    const handleQuantityPurchased = (e) => {
        setQuantityPurchased(e.target.value);
        setSumCost(product.cost * e.target.value);
    }

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`https://mypetshop4.herokuapp.com/api/products/${id}`)
            .then(res => {
                for(let i=0; i<res.data.quantity; i++){
                    quantity.current.push(i+1);
                }
                description.current.innerHTML = res.data.description;
                setProduct(res.data);
                setSumCost(res.data.cost);
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <>
            <Header categories={categories} />
            <div className={clsx(styles.main)}>
                <div style={{marginTop: '20px'}}>
                    <Link to={`/categories/${product.idCategory}`} className={clsx(styles.title)}>
                        {categories.map(category => {
                            if(product.idCategory === category._id){
                                return category.title;
                            }
                        })}
                    </Link> &gt; <span>{product.productName}</span>
                </div>
                <hr />
                <div className={clsx(styles.detail)}>
                    <div className={clsx(styles.image)}>
                        <div style={{width: '80%', height: '300px', margin: 'auto'}}>
                            <Carousel>
                                {
                                    product.images && product.images.map(image => {
                                        return (
                                            <Carousel.Item key={image._id}>
                                                <img
                                                className="d-block w-100"
                                                src={image.url}
                                                alt=""
                                                />
                                            </Carousel.Item>
                                        );
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.productName)}>{product.productName}</h3>
                        <div ref={description}></div>
                        <div className={clsx(styles.cost)}>{product.cost} <span style={{fontSize: '20px'}}>đ</span></div>
                        <div>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                        Số lượng
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Select onChange={handleQuantityPurchased}>
                                            {
                                                quantity.current.map(qtt => {
                                                    return <option key={qtt} value={qtt}>{qtt}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" onClick={handleBuyNow}>Mua ngay</Button>{' '}
                                <Button variant="warning" onClick={handleAddToCart}>Vào giỏ hàng</Button>
                            </Form>
                        </div>
                    </div>
                    <div className={clsx(styles.contact)}>
                        <p><FaPhoneAlt style={{color: '#f68930'}} /> <b>Liên hệ: </b>0123456789</p>
                        <p><FaLocationArrow style={{color: '#f68930'}} /> <b>Địa chỉ: </b>Ninh Kiều, Cần Thơ</p>
                        <p><i>Mở cửa từ 8h đến 22h hàng ngày</i></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
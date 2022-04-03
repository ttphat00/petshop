import clsx from "clsx";
import { Card, Button } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './Products.module.css';

export default function Products({ category, products }){

    return(
        <div className={clsx(styles.main)}>
            <h4 id={category._id} className={clsx(styles.category)}>{category.title}</h4>
            <hr/>
            <div className={clsx(styles.products)}>
                {
                    products.map(product => {
                        if(category._id === product.idCategory){
                            return(
                                <Card key={product._id} style={{ width: '14rem' }}>
                                    <div style={{textAlign: 'center', height: '190px'}}><Link to={`/products/${product._id}`}><Card.Img className={clsx(styles.image)} src={product.images[0].url} /></Link></div>
                                    <Card.Body style={{fontSize: '14px'}}>
                                        <Card.Title style={{fontSize: '17px', height: '90px'}}><Link to={`/products/${product._id}`} className={clsx(styles.cartTitle)}>{product.productName}</Link></Card.Title>
                                        <Card.Text>Số lượng: {product.quantity}</Card.Text>
                                        <Card.Text>Giá: <span style={{fontSize: '20px', color: '#f68930'}}>{product.cost} đ</span></Card.Text>
                                        <Link to={`/products/${product._id}`}><Button className={clsx(styles.buttonCart)}><FaCartPlus /></Button></Link>
                                    </Card.Body>
                                </Card>
                            );
                        }else return null;
                    })
                }
            </div>
        </div>
    );
}
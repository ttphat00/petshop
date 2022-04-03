import { useEffect, useState } from 'react';
import { Carousel, Button } from "react-bootstrap";
import clsx from "clsx";
import axios from 'axios';
import styles from './Home.module.css';
import Header from "../Header";
import Footer from "../Footer";
import Products from "../Products";

export default function Home(){
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        document.title = 'Pet Shop';

        axios.get('https://mypetshop4.herokuapp.com/api/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        const goToTop = () => {
            if(window.scrollY > 1500){
                setShow(true);
            }else{
                setShow(false);
            }
        }

        window.addEventListener('scroll', goToTop);

        return () => {
            window.removeEventListener('scroll', goToTop);
        }

    }, [])

    return(
        <>
            <Header categories={categories}/>
            <div className={clsx(styles.main)}> 
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/petshop347/image/upload/v1648282335/slide1_bqwonp.png"
                        alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/petshop347/image/upload/v1648282330/slide2_lec2sk.png"
                        alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/petshop347/image/upload/v1648282329/slide3_pvd1f8.png"
                        alt=""
                        />
                    </Carousel.Item>
                </Carousel>
                <div className={clsx(styles.products)}>
                    {
                        categories.map(cate => {
                            return <Products key={cate._id} category={cate} products={products}/>
                        })
                    }
                </div>
            </div>
            <div className={clsx(styles.btnTop, { [styles.btnVisible]: show })}><a href='#top-header'><Button variant='warning'>Top</Button></a></div>
            <Footer />
        </>
    );
}
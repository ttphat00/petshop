import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import clsx from "clsx";
import axios from 'axios';
import styles from './CategoryPage.module.css';
import Header from "../Header";
import Footer from "../Footer";
import Products from "../Products";

export default function CategoryPage(){
    const { id } = useParams();
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

    return (
        <>
            <Header categories={categories}/>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.products)}>
                    {
                        categories.map(category => {
                            if(category._id === id){
                                return <Products key={category._id} category={category} products={products} />
                            }
                        })
                    }
                </div>
            </div>
            <div className={clsx(styles.btnTop, { [styles.btnVisible]: show })}><a href='#top-header'><Button variant='warning'>Top</Button></a></div>
            <Footer />
        </>
    );
}
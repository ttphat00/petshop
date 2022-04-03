import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { MDBDataTableV5 } from 'mdbreact';
import styles from './MyProducts.module.css';
import { Link } from 'react-router-dom';

export default function MyProducts(){
    const [toggle, setToggle] = useState(false);
    const [categories, setCategories] = useState([]);
    const [datatable, setDatatable]= useState({
        columns: [
          {
            label: 'Tên sản phẩm',
            field: 'name',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'ProductName',
            },
          },
          {
            label: 'Hình ảnh',
            field: 'image',
            sort: 'disabled',
            width: 270,
          },
          {
            label: 'Số lượng',
            field: 'quantity',
            width: 200,
          },
          {
            label: 'Giá',
            field: 'cost',
            sort: 'asc',
            width: 100,
          },
          {
            label: 'Danh mục',
            field: 'category',
            width: 150,
          },
          {
            label: 'Quản lý',
            field: 'manage',
            sort: 'disabled',
            width: 100,
          },
        ],
    });

    const handleDelete = (id) => {
      const mess = window.confirm("Đồng ý xóa sản phẩm này?");
      if(mess){
        axios.delete(`https://mypetshop4.herokuapp.com/api/products/${id}`)
          .then(res => {
            console.log(res.data);
            setToggle(!toggle);
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
    }, []);

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/products/my-products', {
            headers: {
                x_authorization: localStorage.getItem('emp_token')
            }
        })
            .then(res => {
                const newArr = [];
                res.data.map(product => {
                    let title = '';
                    for(let i=0; i<categories.length; i++){
                        if(product.idCategory===categories[i]._id){
                            title = categories[i].title;
                            break;
                        }
                    }
                    const row = {
                        name: product.productName,
                        image: <img style={{width: '55px', height: '60px'}} src={product.images[0].url} alt='' />,
                        quantity: product.quantity,
                        cost: product.cost,
                        category: title,
                        manage: <div><Link to={`/dashboard/edit-product/${product._id}`}><Button style={{color: 'blue'}} variant='light'><FaEdit /></Button></Link>{' '}<Button onClick={() => {handleDelete(product._id)}} style={{color: 'red'}} variant='light'><FaBan /></Button></div>,
                    }
                    newArr.push(row);
                })
                setDatatable({
                    ...datatable,
                    rows: newArr
                });
            })
            .catch(err => console.log(err));
    }, [toggle, categories]);

    return(
        <>
            <div className={clsx(styles.title)}>
                <h2>Danh Sách Các Sản Phẩm Đã Thêm</h2>
            </div>
            <hr />
            <div className={clsx(styles.buttonAdd)}>
                <Link to='/dashboard/create-product'><Button variant='primary'>Thêm sản phẩm</Button></Link>
            </div>
            <div className={clsx(styles.table)}>
                <MDBDataTableV5 hover entriesOptions={[5, 10, 15, 20]} entries={5} pagesAmount={4} data={datatable} />
            </div>
        </>
    );
}
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './EditProduct.module.css';

export default function EditProduct(){
    const { id } = useParams();

    const [validated, setValidated] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [cost, setCost] = useState();
    const [category, setCategory] = useState();
    const [images, setImages] = useState([]);
    const [urlFile, setUrlFile] = useState([]);

    const handleName = (e) => {
        setProductName(e.target.value);
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleCost = (e) => {
        setCost(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleImages = (e) => {
        setImages(e.target.files);
        const urlArray = [];
        for(let i=0; i<e.target.files.length; i++){
            const urlItem = {
                _id: i+1,
                url: URL.createObjectURL(e.target.files[i]),
            }
            urlArray.push(urlItem);
        }
        setUrlFile(urlArray);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            const uploadData = new FormData();
            for(let i=0; i<images.length; i++){
                uploadData.append("file", images[i]);
            }
            uploadData.append("productName", productName);
            uploadData.append("description", description);
            uploadData.append("quantity", quantity);
            uploadData.append("cost", cost);
            uploadData.append("idCategory", category);

            axios.put(`https://mypetshop4.herokuapp.com/api/products/${id}`, uploadData)
                .then(res => {
                    window.alert('Cập nhật sản phẩm thành công!');
                    window.location = '/dashboard/my-products';
                })
                .catch(err => console.log(err));
        }
    
        setValidated(true);
    };

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
                setProductName(res.data.productName);
                setDescription(res.data.description);
                setQuantity(res.data.quantity);
                setCost(res.data.cost);
                setCategory(res.data.idCategory);
                setUrlFile(res.data.images);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        return () => {
            urlFile && urlFile.map(item => {
                URL.revokeObjectURL(item.url);
            })
        }
    }, [urlFile])

    return(
        <>
            <div className={clsx(styles.title)}>
                <h2>Cập nhật Sản Phẩm</h2>
            </div>
            <hr />
            <div className={clsx(styles.editForm)}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="10" controlId="validationCustom01">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control type="text" placeholder="Tên sản phẩm" defaultValue={productName} onChange={handleName} required />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên sản phẩm.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="10">
                            <Form.Label>Mô tả</Form.Label>
                            <CKEditor
                                data={description}
                                editor={ ClassicEditor }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                } }
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="5">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control type="file" multiple onChange={handleImages} />
                        </Form.Group>
                    </Row>
                    {
                        urlFile && urlFile.map(image => {
                            return(
                                <img key={image._id} style={{width: '50px', height: '50px', marginRight: '10px', marginBottom: '10px'}} src={image.url} alt='' />
                            );
                        })
                    }
                    <Row className="mb-4">
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control type="text" placeholder="Số lượng" defaultValue={quantity} onChange={handleQuantity} pattern='[1-9]|[1-9][0-9]+' required />
                            <Form.Control.Feedback type="invalid">
                                Số lượng không hợp lệ.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="text" placeholder="1000" defaultValue={cost} onChange={handleCost} pattern='[1-9][0-9]{2}[0-9]+' required />
                            <Form.Control.Feedback type="invalid">
                                Giá không hợp lệ.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Select onChange={handleCategory} value={category}>
                                {
                                    categories.map(cate => {
                                        return <option key={cate._id} value={cate._id}>{cate.title}</option>;
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Cập nhật</Button>{' '}
                    <Link to='/dashboard/my-products'><Button variant="light">Hủy</Button></Link>
                </Form>
            </div>
        </>
    );
}
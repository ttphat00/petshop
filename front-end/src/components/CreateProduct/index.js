import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './CreateProduct.module.css';

export default function CreateProduct(){
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
            urlArray.push(URL.createObjectURL(e.target.files[i]));
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

            axios.post('https://mypetshop4.herokuapp.com/api/products', uploadData, {
                headers: {
                    x_authorization: localStorage.getItem('emp_token')
                }
            })
                .then(res => {
                    window.alert('Th??m s???n ph???m th??nh c??ng!');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    
        setValidated(true);
    };

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/categories')
            .then(res => {
                setCategories(res.data);
                setCategory(res.data[0]._id);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        return () => {
            urlFile && urlFile.map(url => {
                URL.revokeObjectURL(url);
            })
        }
    }, [urlFile])

    return(
        <>
            <div className={clsx(styles.title)}>
                <h2>Th??m S???n Ph???m</h2>
            </div>
            <hr />
            <div className={clsx(styles.createForm)}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="10" controlId="validationCustom01">
                            <Form.Label>T??n s???n ph???m</Form.Label>
                            <Form.Control type="text" placeholder="T??n s???n ph???m" onChange={handleName} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p t??n s???n ph???m.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="10">
                            <Form.Label>M?? t???</Form.Label>
                            <CKEditor
                                editor={ ClassicEditor }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                } }
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="5" controlId="validationCustom03">
                            <Form.Label>H??nh ???nh</Form.Label>
                            <Form.Control type="file" multiple onChange={handleImages} required />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng ch???n h??nh ???nh.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {
                        urlFile && urlFile.map(url => {
                            return(
                                <img key={url} style={{width: '50px', height: '50px', marginRight: '10px', marginBottom: '10px'}} src={url} alt='' />
                            );
                        })
                    }
                    <Row className="mb-4">
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>S??? l?????ng</Form.Label>
                            <Form.Control type="text" placeholder="S??? l?????ng" onChange={handleQuantity} pattern='[1-9]|[1-9][0-9]+' required />
                            <Form.Control.Feedback type="invalid">
                                S??? l?????ng kh??ng h???p l???.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Gi??</Form.Label>
                            <Form.Control type="text" placeholder="1000" onChange={handleCost} pattern='[1-9][0-9]{2}[0-9]+' required />
                            <Form.Control.Feedback type="invalid">
                                Gi?? kh??ng h???p l???.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Danh m???c</Form.Label>
                            <Form.Select onChange={handleCategory}>
                                {
                                    categories.map(category => {
                                        return <option key={category._id} value={category._id}>{category.title}</option>;
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Th??m</Button>
                </Form>
            </div>
        </>
    );
}
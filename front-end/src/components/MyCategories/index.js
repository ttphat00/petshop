import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { MDBDataTableV5 } from 'mdbreact';
import styles from './MyCategories.module.css';

export default function MyCategories(){
    const [toggle, setToggle] = useState(false);
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState();
    const [idCate, setIdCate] = useState();
    const [cateName, setCateName] = useState();
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [datatable, setDatatable]= useState({
        columns: [
          {
            label: 'Danh mục',
            field: 'title',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Title',
            },
          },
          {
            label: 'Quản lý',
            field: 'manage',
            sort: 'disabled',
            width: 100,
          },
        ],
    });

    const handleCloseAdd = () => {
        setShowAdd(false);
        setValidated(false);
    };

    const handleShowAdd = () => {
      setShowAdd(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        setValidated(false);
    };

    const handleShowEdit = (id, name) => {
      setShowEdit(true);
      setIdCate(id);
      setCateName(name);
    };

    const handleTitle = (e) => {
      setTitle(e.target.value);
    };

    const handleCateName = (e) => {
      setCateName(e.target.value);
    };

    const handleAdd = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        if (form.checkValidity()) {
            axios.post('https://mypetshop4.herokuapp.com/api/categories', { title }, {
                headers: {
                    x_authorization: localStorage.getItem('emp_token')
                }
            })
                .then(res => {
                    window.alert('Thêm danh mục thành công!');
                    setShowAdd(false);
                    setToggle(!toggle);
                    setValidated(false);
                })
                .catch(err => {
                    window.alert('Danh mục này đã tồn tại!!!');
                });
        }
    
    };

    const handleEdit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            axios.put(`https://mypetshop4.herokuapp.com/api/categories/${idCate}`, { title: cateName })
                .then(res => {
                    console.log(res.data);
                    setShowEdit(false);
                    setToggle(!toggle);
                })
                .catch(err => {
                    window.alert('Danh mục này đã tồn tại!!!');
                });
        }
    
        setValidated(true);
    };

    const handleDelete = (id) => {
        const mess = window.confirm("Đồng ý xóa danh mục này?");
        if(mess){
          axios.delete(`https://mypetshop4.herokuapp.com/api/categories/${id}`)
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
                const newArr = [];
                res.data.map(category => {
                    const row = {
                        title: category.title,
                        manage: <div><Button onClick={() => handleShowEdit(category._id, category.title)} style={{color: 'blue'}} variant='light'><FaEdit /></Button>{' '}<Button style={{color: 'red'}} onClick={() => handleDelete(category._id)} variant='light'><FaBan /></Button></div>,
                    }
                    newArr.push(row);
                })
                setDatatable({
                    ...datatable,
                    rows: newArr
                });
            })
            .catch(err => console.log(err));
    }, [toggle]);

    return(
        <>
            <div className={clsx(styles.title)}>
                <h2>Danh Sách Các Danh Mục Sản Phẩm</h2>
            </div>
            <hr />
            <div className={clsx(styles.buttonAdd)}>
                <Button variant='primary' onClick={handleShowAdd}>Thêm danh mục</Button>
            </div>
            <div className={clsx(styles.table)}>
                <MDBDataTableV5 hover entriesOptions={[5, 10, 15, 20]} entries={5} pagesAmount={4} data={datatable} />
            </div>

            <Modal show={showAdd} onHide={handleCloseAdd}>
              <Modal.Header closeButton>
                <Modal.Title>Thêm danh mục</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleAdd}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="10" controlId="validationCustom01">
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control type="text" placeholder="Tên danh mục" onChange={handleTitle} required />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên danh mục.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type='submit'>
                        Thêm
                    </Button>{' '}
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Hủy
                    </Button>
                </Form>
              </Modal.Body>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Cập nhật danh mục</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleEdit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="10" controlId="validationCustom02">
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control type="text" value={cateName} onChange={handleCateName} required />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên danh mục.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type='submit'>
                        Lưu
                    </Button>{' '}
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Hủy
                    </Button>
                </Form>
              </Modal.Body>
            </Modal>
        </>
    );
}
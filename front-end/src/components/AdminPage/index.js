import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Navbar, Nav, Offcanvas, Container, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { MDBDataTableV5 } from 'mdbreact';
import styles from './AdminPage.module.css';

export default function AdminPage(){
    const [toggle, setToggle] = useState(false);
    const [username, setUsername] = useState();
    const [permission, setPermission] = useState();
    const [email, setEmail] = useState();
    const [idUser, setIdUser] = useState();
    const [show, setShow] = useState(false);
    const [datatable, setDatatable]= useState({
        columns: [
          {
            label: 'Username',
            field: 'name',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Name',
            },
          },
          {
            label: 'Email',
            field: 'email',
            width: 270,
          },
          {
            label: 'Phone',
            field: 'phone',
            width: 200,
          },
          {
            label: 'Ngày sinh',
            field: 'birth',
            sort: 'asc',
            width: 100,
          },
          {
            label: 'Giới tính',
            field: 'gender',
            sort: 'disabled',
            width: 150,
          },
          {
            label: 'Quyền',
            field: 'permission',
            sort: 'disabled',
            width: 100,
          },
          {
            label: 'Quản lý',
            field: 'manage',
            sort: 'disabled',
            width: 100,
          },
        ],
    });

    const handleClose = () => setShow(false);

    const handleShow = (id, name, mail, perm) => {
      setShow(true);
      setIdUser(id);
      setEmail(mail);
      setUsername(name);
      setPermission(perm);
    };

    const handlePermission = (e) => {
      setPermission(e.target.value);
    }

    const handleSave = () => {
      axios.put(`https://mypetshop4.herokuapp.com/api/users/${idUser}`,{ permission })
        .then(res => {
          console.log(res.data);
          setToggle(!toggle);
        })
        .catch(err => console.log(err));

      setShow(false);
    }

    const handleDelete = (id) => {
      const mess = window.confirm("Đồng ý xóa người dùng này?");
      if(mess){
        axios.delete(`https://mypetshop4.herokuapp.com/api/users/${id}`)
          .then(res => {
            console.log(res.data);
            setToggle(!toggle);
          })
          .catch(err => console.log(err));
      }
    }

    useEffect(() => {
        axios.get('https://mypetshop4.herokuapp.com/api/users')
            .then(res => {
                const newArr = [];
                res.data.map(user => {
                    const row = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        birth: user.birth,
                        gender: user.gender,
                        permission: user.permission,
                        manage: <div><Button onClick={() => handleShow(user._id, user.name, user.email, user.permission)} style={{color: 'blue'}} variant='light'><FaEdit /></Button>{' '}<Button onClick={() => handleDelete(user._id)} style={{color: 'red'}} variant='light'><FaBan /></Button></div>,
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

    useEffect(() => {
      document.title = 'Admin Page';
    }, [])

    return(
        <>
            <div className={clsx(styles.header)}>
                <Navbar bg="light" expand={false}>
                    <Container fluid>
                        <Navbar.Brand href="#">Quản Lý Người Dùng</Navbar.Brand>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/">Về trang chủ</Nav.Link>
                                    <Nav.Link href="/login">Về trang login</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
            <div className={clsx(styles.main)}>
                <MDBDataTableV5 hover entriesOptions={[5, 10, 15, 20]} entries={5} pagesAmount={4} data={datatable} />
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Cập nhật quyền</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quyền</Form.Label>
                <Form.Select value={permission || ""} onChange={handlePermission}>
                  <option value="Admin">Admin</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="">Null</option>
                </Form.Select>
              </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Lưu
                </Button>
              </Modal.Footer>
            </Modal>
        </>
    );
}
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import styles from './Footer.module.css';

export default function Footer(){
    return(
        <div className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 style={{color: '#f68930'}}>PET SHOP</h3>
                    <p><b>Địa chỉ:</b> Ninh Kiều, Cần Thơ</p>
                    <p><b>Người chịu trách nhiệm:</b> Tran Toan Phat</p>
                    <p><b>Điện thoại:</b> 0123456789</p>
                </div>
                <div className={styles.info}>
                    <p><b>Liên kết với chúng tôi:</b></p>
                    <p>Facebook <Link to='#' style={{color: 'blue', fontSize: '20px'}}><FaFacebook /></Link></p>
                    <p>Tiktok <Link to='#' style={{color: 'black', fontSize: '20px'}}><FaTiktok /></Link></p>
                </div>
            </div>
        </div>
    );
}
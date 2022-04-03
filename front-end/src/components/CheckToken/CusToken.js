import Cart from "../Cart";

export default function CusToken(){
    return(
        <>
            {localStorage.getItem('cus_token') ? <Cart /> : window.location.assign('/login')}
        </>
    );
}
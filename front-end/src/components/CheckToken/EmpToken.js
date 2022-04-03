import EmpPage from "../EmpPage";

export default function EmpToken(){
    return(
        <>
            {localStorage.getItem('emp_token') ? <EmpPage /> : window.location.assign('/login')}
        </>
    );
}
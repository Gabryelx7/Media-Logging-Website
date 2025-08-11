import FormAuth from "../components/FormAuth"

const Login = () => {
    return(
    <div>
        <FormAuth route="/api/token/" method="login"/>
        <center><a href="/register/">Don't have an account? Register here</a></center>
    </div>
    
    
    );
}

export default Login
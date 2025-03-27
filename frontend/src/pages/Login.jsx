import Form from "../components/Form"

function Login() {
    return(
    <div>
        <Form route="/api/token/" method="login"/>
        <center><a href="/register/">Don't have an account? Register here</a></center>
    </div>
    
    
    );
}

export default Login
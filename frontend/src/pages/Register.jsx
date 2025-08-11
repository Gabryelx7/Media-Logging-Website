import FormAuth from "../components/FormAuth"

const Register = () => {
    return(
    <div>
        <FormAuth route="/api/user/register/" method="register"/>
        <center><a href="/login/" style={{color: "#FFF"}}>Already have an account? Login here</a></center>
    </div>
    )
}

export default Register
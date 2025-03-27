import Form from "../components/Form"

function Register() {
    return(
    <div>
        <Form route="/api/user/register/" method="register"/>
        <center><a href="/login/">Already have an account? Login here</a></center>
    </div>
    )
}

export default Register
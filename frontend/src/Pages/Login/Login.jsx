import { useContext, useState } from 'react';
import './Login.css';
import toast from 'react-hot-toast';
import {login} from '../../Service/AuthService.js'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.jsx';

const Login = () => {
    const {setAuthData} = useContext(AppContext);
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setData((data) => ({
            ...data,
            [name] : value
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(data);
            if(response.status === 200) {
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role)
                navigate("/dashboard");
            }
        }
        catch(error) {
            console.log(error);
            toast.error("Email or Password invalid");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='bg-light d-flex align-items-center justify-content-center vh-100 login-background'>
            <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign in</h1>
                        <p className='card-text text-muted'>
                            Sign in below to access your account.
                        </p>
                    </div>
                    <div className='mt-4'>
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">Email Address</label>
                                <input type="text"
                                    name='email'
                                    id='email'
                                    placeholder='yourname@example.com'
                                    className='form-control'
                                    onChange={onChangeHandler}
                                    value={data.email}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                <input type="password"
                                    name='password'
                                    id='password'
                                    placeholder='********'
                                    className='form-control'
                                    onChange={onChangeHandler}
                                    value={data.password}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-dark btn-lg" disabled={Loading}>{Loading ? "Loading..." : "Sign in"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

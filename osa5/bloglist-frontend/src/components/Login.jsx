const LoginForm = ({username, password, eventHandler, userHandler, passwordHandler}) => {
    return(
        <form onSubmit={eventHandler}>
            <h2>Login</h2>
                <div>
                    <input
                    value={username}
                    onChange={userHandler}/>
                </div>
                <div>
                    <input
                    value={password}
                    onChange={passwordHandler}/>
                </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
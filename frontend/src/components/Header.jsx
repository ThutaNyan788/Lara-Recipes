import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/ContextProvdier'

const Header = () => {

    let { user,setToken} = useContext(Context);
    

    let logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        window.location.reload()

        console.log('logout hello');
        
    }

    return (
        <header>
            <nav className="flex justify-between items-center h-[80px] border-b xl:px-[80px] md:px-[50px] px-[20px]">
                <div>
                    <a href="/" className="text-3xl text-green-400 font-semibold">My Recipe</a>
                </div>
                <div className='flex items-center space-x-3 '>


                    {user.name ? (
                        <>
                            <div>
                                Hello {user.name}
                            </div>

                            <button type='button' className='bg-none text-black' onClick={logout}>
                                Logout
                            </button>

                            <Link to={"/createPage"} className="px-3 py-3 rounded-lg bg-red-400 hover:opacity-[0.85] transition-all duration-500 text-white flex items-center gap-2">
                                <i className="fa-solid fa-plus" />
                                <div>Add Recipe</div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}


                </div>
            </nav>
        </header>

    )
}

export default Header
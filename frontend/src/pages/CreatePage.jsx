import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const CreatePage = () => {
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState([]);
    let [category_id, setCategory_id] = useState('');
    let [preview, setPreview] = useState('');
    let [path,setPath] = useState('');
    let navigate = useNavigate();


    let fetchCategories = async () => {
        let categories = axios.get("http://127.0.0.1:8000/api/categories");
        let getCategories = (await categories).data;


        setCategory(getCategories);
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    let uploadFile = async (e) => {
        let file = e.target.files[0];



        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('photo', file);


        let ImgPath = axios.post("http://127.0.0.1:8000/api/recipes/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        let data = await ImgPath;
        let path = data.data.path;

      
        setPath(path);
        


    }

    useEffect(() => {
        uploadFile();
    }, [uploadFile])


    let submit = async (e) => {

        e.preventDefault();

        let recipe ={
            title,
            description,
            category_id,
            photo:path
        }


        let getRecipe = axios.post("http://127.0.0.1:8000/api/recipes",recipe);

        let data = await getRecipe;
        

        navigate("/");
        

    }


    return (
        <>
            <div>
                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                    </svg>
                </button>
                <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/" className="flex items-center text-2xl  text-green-500 font-bold p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    My Recipe
                                </Link>
                            </li>

                            <li>
                                <a href="form.php" className="bg-gray-400 text-black flex items-center w-full p-2 text-base transition duration-75 rounded-lg group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    <img className="w-[25px]" src="https://cdn2.iconfinder.com/data/icons/picnic-outline/64/FOOD_RECIPE-recipe-ingredients-ingredient-education-recipes-orange-books-cooking-256.png" alt="" />
                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Recipe Form</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="p-4 sm:ml-64 pt-[20px] h-[100vh]">
                    <h1 className="text-3xl font-bold border-b pb-4">Recipe</h1>
                    <form onSubmit={submit} className="max-w-[700px] mx-auto mt-[100px] shadow-md p-8 rounded-lg space-y-5" encType='multipart/form-data'>
                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" id="title" onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Chicken Curry..." />
                            {/* <span class="text-red-500 text-xs ml-2 tracking-wider">title is required!</span> */}
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="This is created..." defaultValue={""} />
                            {/* <span class="text-red-500 text-xs ml-2 tracking-wider">title is required!</span> */}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="category" onChange={(e)=>setCategory_id(e.target.value)} className='text-black w-full py-4 border-2 px-2 rounded-xl'>
                                <option value="" selected>Choose Category</option>
                                {category.map((cat) => {
                                    return (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <input type="file" className="block my-8" onChange={(e)=>uploadFile(e)} />
                        {/* added image will show here */}
                        {/* <div>
  <img class="h-[300px] w-full object-cover" src="" alt="">
</div> */}
                        <button type="submit" className="block w-full hover:text-white hover:bg-red-400 transition-all duration-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-red-400 text-red-400">Done</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreatePage
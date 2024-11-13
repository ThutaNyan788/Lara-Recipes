import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const EditPage = () => {
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState([]);
    let [category_id, setCategory_id] = useState('');
    let [preview, setPreview] = useState('');
    let [path, setPath] = useState('');
    let [recipe, setRecipe] = useState({});
    let params = useParams();
    let navigate = useNavigate();



    let fetchCategories = async () => {
        let categories = axios.get("http://127.0.0.1:8000/api/categories");
        let recipe = axios.get("http://127.0.0.1:8000/api/recipes/"+params.id)
        let getCategories = (await categories).data;
        let response = (await recipe).data;


        
        setTitle(response.title);   
        setDescription(response.description);
        setCategory_id(response.category_id);
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

        let recipe = {
            title,
            description,
            category_id,
            photo: path
        }


        let getRecipe = axios.patch("http://127.0.0.1:8000/api/recipes/"+params.id, recipe);

        let data = await getRecipe;


        navigate("/");

    }


    return (
        <>

            <div className="p-4  pt-[20px] h-[100vh] mx-auto">
                <h1 className="text-3xl font-bold border-b pb-4 text-center">Edit Recipe</h1>
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
                        <select id="category" onChange={(e) => setCategory_id(e.target.value)} className='text-black w-full py-4 border-2 px-2 rounded-xl'>
                            <option value="" >Choose Category</option>
                            {category.map((cat) => {
                                return (
                                    <option key={cat.id} value={cat.id} selected={`${category_id == cat.id} ? ${true}  : ${false}`}>{cat.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <input type="file" className="block my-8" onChange={(e) => uploadFile(e)} />
                    {/* added image will show here */}
                    {/* <div>
  <img class="h-[300px] w-full object-cover" src="" alt="">
</div> */}
                    <button type="submit" className="block w-full hover:text-white hover:bg-red-400 transition-all duration-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-red-400 text-red-400">Done</button>
                </form>
            </div>


        </>
    )
}

export default EditPage
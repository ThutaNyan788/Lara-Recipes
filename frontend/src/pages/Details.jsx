import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Details = () => {

    let [recipe, setRecipe] = useState({});
    let params = useParams();
    let navigate = useNavigate();

    let fetchRecipe = async () => {
        let recipe = axios.get("http://127.0.0.1:8000/api/recipes/" + params.id);
        let response = (await recipe).data;

        setRecipe(response);

    }

    let deleteRecipe = async (id) => {

        try {
            axios.delete("http://127.0.0.1:8000/api/recipes/" + id);
            navigate("/");
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        fetchRecipe();
    }, [])

    return (
        <main className="flex gap-5 items-center md:flex-row flex-col xl:px-[80px] md:px-[50px] px-[20px] my-11">
            <img className="max-h-[400px] w-[350px]" src={import.meta.env.VITE_IMG_URL + recipe.photo} alt="product image" />
            <div className="space-y-5">
                <h5 className="text-4xl font-semibold tracking-tight text-gray-900">
                    {recipe.title}
                </h5>
                <p className="text-gray-500">
                    {recipe.description}
                </p>
                <div className="flex gap-4 border-t py-5 justify-end">
                    <Link to={`/recipes/${recipe.id}/edit`} className="bg-blue-400 text-white px-4 py-2 rounded-lg">
                        Edit
                    </Link>
                    <button type='button' onClick={() => deleteRecipe(recipe.id)} className="bg-red-500 text-white px-3 py-2 rounded-lg">Delete</button>
                </div>
            </div>
        </main>

    )
}

export default Details
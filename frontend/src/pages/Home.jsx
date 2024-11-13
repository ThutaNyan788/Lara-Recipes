import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Home = () => {
    let [recipesArr, setRecipesArr] = useState([]);
    let [categoriesArr, setCategoriesArr] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();
    let [links,setLinks] = useState([]);

    let fetchRecipes = async (url = "http://127.0.0.1:8000/api/recipes/?page=1"+"&") => {
        let recipes = axios.get(`${url}${searchParams.get("category") ? "category="+searchParams.get("category") : ""}`);
        let categories = axios.get("http://127.0.0.1:8000/api/categories");

        let getRecipes = (await recipes).data;
        let getCategories = (await categories).data;
        
        setLinks(getRecipes);
        setCategoriesArr(getCategories);
        setRecipesArr(getRecipes.data);
        
        

    }

    useEffect(() => {
        fetchRecipes();
    }, [searchParams.get("category")])

    let onPageChange=(url)=>{
        fetchRecipes(url);
    }


    return (
        <>
            <div>
                <h1 className="text-center mt-11 text-5xl font-bold text-gray-800 leading-tight">
                    All your favorite <span className="font-bold text-red-400">recipes,</span><br />
                    <span className="font-bold text-red-400">in one place</span>
                </h1>
                <div className="flex justify-center md:flex hidden">
                    <nav className="bg-red-400 text-white grid grid-flow-col text-center mt-14">
                        <Link to="/?category=" className="cursor-pointer hover:bg-white hover:text-red-400 transition-all duration-500 w-[120px] p-3 active">All recipes</Link>
                        {categoriesArr.map((category) => {
                            return (
                                <Link to={"/?category="+category.name} key={category.id} className="cursor-pointer hover:bg-white hover:text-red-400 transition-all duration-500 w-[120px] p-3">{category.name}</Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="flex justify-center mt-11 block md:hidden">
                    <select className="appearance-none bg-red-400 text-white outline-none border-none p-3 w-[300px] text-center" name id>
                        <option value="all">All Recipes</option>
                        
                        {categoriesArr.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                {/* recipe */}
                <div className="my-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">

                    {recipesArr.map((recipe) => {
                        return (
                            <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg active:shadow-none transition-all duration-500">
                                    <img className="h-[300px] mb-4 rounded-t-lg w-full object-cover" 
                                    src={import.meta.env.VITE_IMG_URL+recipe.photo} alt={recipe.title} />
                                    <div className="px-5 pb-5">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {recipe.title}
                                        </h5>
                                        <p className="line-clamp-2 mt-2 text-gray-500">
                                            {recipe.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}


                </div>
            </div>


            <Pagination recipes={links} onPageChange={onPageChange}/>

        </>
    )
}

export default Home
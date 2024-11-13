import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ recipes:getRecipes, onPageChange }) => {
    
  
    let [recipes, setRecipes] = useState({});


    useEffect(() => {
        setRecipes(getRecipes);
    },[getRecipes])


   
  
    
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(recipes.prev_page_url)}
                    disabled={!recipes.prev_page_url}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(recipes.next_page_url)}
                    disabled={!recipes.next_page_url}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing page {recipes.current_page} of {recipes.last_page}
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {recipes.links && recipes.links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.url ? `?page=${link.label}` : "#"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) onPageChange(link.url);
                                }}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                    link.active ? 'z-10 bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {link.label === "&laquo; Previous" ? "Previous" : link.label === "Next &raquo;" ? "Next" : link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;

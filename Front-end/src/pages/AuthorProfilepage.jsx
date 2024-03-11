import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";

function AuthorProfilepage() {
    const { id } = useParams();
    const [author, setAuthors] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/author/getAuthorbyId/${id}`)
            .then(response => {
                if (response.status === 201) {
                    setAuthors(response.data);
                    console.log(response.data)
                } else {
                    setError("Failed to fetch authors");
                }
                setLoading(false);
            })
            .catch(error => {
                
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/author/getArticlesbyID/${id}`)
            .then(response => {
                if (response.status === 201) {
                    setArticles(response.data);
                } else {
                    
                }
                
            })
            .catch(error => {
                
            });
    }, []);

    return (
        <div className="py-16">
            <div className="mx-auto px-6 max-w-6xl">
                <div className="mt-3">
                    <h1 className="text-3xl font-bold">Author's Profile</h1>
                    <div key={author._id} className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                        <div className="relative">
                            <div className="flex items-center justify-center mb-1 md:mb-8">
                                <img className="border-4 border-white shadow-lg h-48 w-48 object-cover rounded-full" src={author.picture} alt={author.name} />
                            </div>
                            <div className="text-center">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{author.name}</h5>
                                <div className="mt-4 md:mt-6 flex justify-center">
                                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 pb-2 rounded-b-[--card-border-radius]">
                            <p className="text-gray-700 dark:text-gray-300">{author.description}</p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <h1>Get in touch</h1>
                        </div>
                        <div className="flex justify-center mt-4">
                            <a href={author.contact}><FaLinkedin size={48} className="mr-4" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700 p-8">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Recent Articles</p>
                </div>
                
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {articles.map((article) => (
                        <li className="py-12 relative group overflow-hidden p-3 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                            <article>
                                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                    <dl>
                                        <dt className="sr-only">Published on</dt>
                                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                            <time dateTime="2023-08-05T00:00:00.000Z">{article.createdAt}</time>
                                        </dd>
                                    </dl>
                                    <div className="space-y-5 xl:col-span-3">
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                    <a className="text-gray-900 dark:text-gray-100" href="/blog/release-of-tailwind-nextjs-starter-blog-v2.0">{article.title}</a>
                                                </h2>
                                            </div>
                                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                {article.description}
                                            </div>
                                        </div>
                                        <div className="text-base font-medium leading-6">
                                            <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Read more: &quot;Release of Tailwind Nextjs Starter Blog v2.0&quot;" href="/blog/release-of-tailwind-nextjs-starter-blog-v2.0">Read more →</a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AuthorProfilepage;

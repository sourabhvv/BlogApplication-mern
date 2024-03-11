import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function Articles() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [expandedArticles, setExpandedArticles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/author/getallArticles")
            .then(response => {
                if (response.status === 201) {
                    setArticles(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }, []);

    const toggleExpand = (articleId) => {
        if (expandedArticles.includes(articleId)) {
            setExpandedArticles(expandedArticles.filter(id => id !== articleId));
        } else {
            setExpandedArticles([...expandedArticles, articleId]);
        }
    };

    const isExpanded = (articleId) => {
        return expandedArticles.includes(articleId);
    };

    const filteredArticles = articles.filter(article => {
        if (!filterType || article.type === filterType) {
            return article.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    return (
        <>
            <main className="container mx-auto px-8 py-8">
                <div className="space-y-5">
                    <h1 className="text-3xl font-bold text-gray-900">Latest Articles, Poems, Stories</h1>
                    <p className="text-lg text-gray-600">A blog created with Pencraft</p>
                    <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
                        <input
                            placeholder="Search articles..."
                            className="w-full h-14 px-6 py-2 text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-gray-400"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-6 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
                <ul className="divide-y divide-gray-200">
                    {filteredArticles.map(article => (
                        <li key={article._id} className="relative px-6 py-10 overflow-hidden shadow-xl rounded-3xl bg-cool-indigo-600 sm:px-12 sm:py-20">
                            <article className="space-y-2">
                            <div class="flex items-left justify-left mb-1 md:mb-8"><img class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" src={article.image} alt="sourabh verma"/></div>
                                <p className="text-sm text-gray-500">{formatDate(article.createdAt)}</p>
                                  <p className="text-sm text-gray-500">{article.author}</p>
                                <h2 className="text-xl font-bold text-gray-900">title :{article.title}</h2>
  <p className="text-gray-500">
                                    {isExpanded(article._id) ? article.description : `${article.description.slice(0, 390)}${article.description.length > 390 ? '...' : ''}`}
                                    <button
                                        className="text-blue-300 hover:text-yellow-400 focus:outline-none"
                                        onClick={() => toggleExpand(article._id)}
                                    >
                                        {isExpanded(article._id) ? 'Read less' : 'Read more'}
                                    </button>
                                </p>                            </article>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default Articles;

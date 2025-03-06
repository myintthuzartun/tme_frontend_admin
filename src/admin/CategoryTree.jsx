import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

const CategoryTree = ({ categories, onDelete }) => {
    const [expanded, setExpanded] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filterCategories = (categories, searchTerm, expandedParents = {}) => {
        // Sort categories by name first
        const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));
    
        if (!searchTerm) return sortedCategories; // If no search, return sorted categories
    
        // Filter categories based on the search term
        const filteredCategories = sortedCategories
            .filter(category => {
                const matches = category.name.toLowerCase().includes(searchTerm.toLowerCase());
                const childMatches = category.children
                    ? filterCategories(category.children, searchTerm, expandedParents).length > 0
                    : false;
    
                if (childMatches) {
                    expandedParents[category.id] = true; // Expand parent if child matches
                }
    
                return matches || childMatches;
            })
            .map(category => ({
                ...category,
                children: category.children ? filterCategories(category.children, searchTerm, expandedParents) : [] // Recursively filter children
            }));
    
        return filteredCategories;
    };

    useEffect(() => {
        let expandedParents = {};
        const filtered = filterCategories(categories, searchTerm, expandedParents);

        setFilteredCategories(filtered);
        setExpanded(expandedParents); // Expand only relevant parents
    }, [searchTerm, categories]);

    const renderCategories = (categories) => {
        return categories.map((category) => (
            <div key={category.id} className="category-item p-2 border rounded mb-2 position-relative">
                <div onClick={() => toggleExpand(category.id)}>
                    <span className='me-2'>
                        {category.children && category.children.length > 0 && (expanded[category.id]
                            ? <FaAngleDown /> : <FaAngleRight />)}
                        &nbsp;{category.name}
                    </span>
                    <span className="action-buttons position-absolute top-0 rounded">
                        <Link
                            to={`/admincategory/${category.id}`}
                            className="btn btn-sm border-0 p-2 text-primary"
                            onClick={(e) => e.stopPropagation()} // Prevent click from toggling category
                        >
                            <MdEdit />
                        </Link>
                        <button
                            className="btn btn-sm border-0 p-2 text-danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(category.id); // Call delete function from parent
                            }}
                        >
                            <LuTrash2 />
                        </button>
                    </span>
                </div>
                {expanded[category.id] && category.children && category.children.length > 0 && (
                    <div className="ms-3 border-start ps-2 mt-2">
                        {renderCategories(category.children)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="category-tree container mt-3">
            <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />
            <div className="categories">
                {renderCategories(filteredCategories)}
            </div>
        </div>
    );
};

export default CategoryTree;

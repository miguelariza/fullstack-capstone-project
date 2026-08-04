import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {urlConfig} from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const [ selectCategory, setSelectCategory ] = useState('');
    const [ selectCondition, setSelectCondition ] = useState('');
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ ageRange, setAgeRange ] = useState({min: 1, max: 10});
    const [ searchResults, setSearchResults ] = useState([]);

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2. Fetch search results from the API based on user inputs.
    useEffect(() => {
        const filteredProducts = setSearchResults.filter((product) => {
            const matchSearchQuery =
                searchQuery === ''
                    ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchCategory =
                selectCategory === '' || selectCategory === product.category;

            const matchCondition =
                selectCondition === '' || selectCondition === product.condition;

            const matchAgeRange =
                product.age_years <= ageRange;

            return matchSearchQuery && matchCategory && matchCondition && matchAgeRange;
        });

        setSearchResults(filteredProducts);
    }, [searchQuery, selectCategory, selectCondition, ageRange]);

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
    };




    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            {/* Task 4: Implement an age range slider and display the selected value. */}
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria*/}
                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    {/*Task 5: Display search results and handle empty results with a message. */}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;

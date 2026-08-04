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
    const [ ageRange, setAgeRange ] = useState(1);
    const [ searchResults, setSearchResults ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Task 2. Fetch search results from the API based on user inputs.
    const handleSearch = () => {
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
    };

    const navigate = useNavigate();
    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/app/product/${productId}`);
    };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select form-select-lg mb-3"
                                    name="category"
                                    id="category"
                                    value={selectCategory}
                                    onChange={(e) => setSelectCategory(e.target.value)}
                                    required
                                >
                                    <option selected value="">All categories</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Condition</label>
                                <select
                                    className="form-select form-select-lg mb-3"
                                    name="condition"
                                    id="condition"
                                    value={selectCondition}
                                    onChange={(e) => setSelectCondition(e.target.value)}
                                    required
                                >
                                    <option selected value="">All conditions</option>
                                    {conditions.map((condition, index) => (
                                        <option key={index} value={condition}>{condition}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <div className="mb-3">
                                <label for="range1" className="form-label">Chronological Age</label>
                                <input type="range" class="form-range" min="0" max="10" value="1" id="range4">
                                Less than <output for="range1" id="rangeValue" aria-hidden="true"></output> years.
                            </div>
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria*/}
                    <div className='mb-3'>
                        <input
                            className='form-control form-control-lg'
                            type='text'
                            placeholder="Add another search criteria"
                            id='searchQuery'
                            name='searchQuery'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                        />
                    </div>
                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    <div className="mb-5">
                        <button onClick={handleSearch} className="btn btn-primary">
                            Search
                        </button>
                    </div>
                    {/*Task 5: Display search results and handle empty results with a message. */}
                    {searchResults.length === 0 ? (
                        <div className="mb-1">
                            <p>No products match your criteria</p>
                        </div>
                    ) : (
                        <div className="row">
                            <h2 className="h3 fw-semibold text-dark">{searchResults.length} Search results</h2>
                            {searchResults.map((gift) => (
                            <div key={gift.id} className="col-md-4 mb-4">
                                <div className="card product-card">
                                    {/* // Task 4: Display gift image or placeholder */}
                                    <div className="image-placeholder">
                                        {
                                            gift.image ? (
                                                <img className="card-img-top" src={gift.image} alt={gift.name} />
                                            ) : (
                                                <div>No image available</div>
                                            )
                                        }
                                    </div>
                                    <div className="card-body">

                                        {/* // Task 5: Display gift image or placeholder */}
                                        {/* // Write your code below this line */}
                                        <h5 className="card-title">{gift.name}</h5>

                                        <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                        {gift.condition}
                                        </p>

                                        {/* // Task 6: Display gift image or placeholder */}
                                        {/* // Write your code below this line */}
                                        <p className="card-text">{formatDate(gift.date_added)}</p>

                                        <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;

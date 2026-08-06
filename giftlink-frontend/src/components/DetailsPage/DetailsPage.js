import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import {urlConfig} from '../../config';

function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

	useEffect(() => {
        const authenticationToken = sessionStorage.getItem('auth-token');
        if (!authenticationToken) {
			// Task 1: Check for authentication and redirect
            console.error("No token available. No information available.");
            navigate(`/app/product/${productId}`);
        }

        // get the gift to be rendered on the details page
        const fetchGift = async () => {
            try {
				// Task 2: Fetch gift details
                let url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${authenticationToken}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('User not found.');
                    } else if (response.status === 401) {
                        sessionStorage.removeItem('auth-token');
                        setError('Unauthorized access');
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                }
                const data = await response.json();
                setGift(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();

		// Task 3: Scroll to top on component mount
		window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }, [productId, navigate]);


    const handleBackClick = () => {
		// Task 4: Handle back click
		navigate(-1);
	};

	//The comments have been hardcoded for this project.
    const comments = [
        {
            author: "John Doe",
            comment: "I would like this!"
        },
        {
            author: "Jane Smith",
            comment: "Just DMed you."
        },
        {
            author: "Alice Johnson",
            comment: "I will take it if it's still available."
        },
        {
            author: "Mike Brown",
            comment: "This is a good one!"
        },
        {
            author: "Sarah Wilson",
            comment: "My family can use one. DM me if it is still available. Thank you!"
        }
    ];


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gift) return <div>Gift not found</div>;

return (
    <div className="container mt-2">
        <div className="row">
            <div className="col-6">
                <button className="btn btn-secondary mt-3" onClick={handleBackClick}>Back</button>
                <div className="card-details product-card mx-auto bg-light">
                    <div className='card-header'>
                    <h2 className="details-title mb-2 mt-2">{gift.name}</h2>
                    </div>
                    <div className="card-body">
                        <div className="image-placeholder mb-2">
                            {/* Task 5: Display gift image */}
                                {
                                    gift.image ? (
                                        <img className="image-placeholder-large" src={gift.image} alt={gift.name} />
                                    ) : (
                                        <div className="no-image-available-large">No image available</div>
                                    )
                            }
                        </div>
                        {/* Task 6: Display gift details */}
                        <p className='card-text mt-3 mb-2'><strong>Category: </strong>
                            {gift.category}</p>
                        <p className='card-text mb-2'><strong>Condition: </strong> 
                            {gift.condition}
                        </p>
                        <p className='card-text mb-2'><strong>Date Added: </strong> 
                            {gift.date_added}
                        </p>
                        <p className='card-text mb-2'><strong>Age (Years): </strong> 
                            {gift.age_years}
                        </p>
                        <p className='card-text mb-3'><strong>Description: </strong> 
                            {gift.description}
                        </p>
                    </div>
                </div>

                <div className="comments-section mt-3">
                        <h3 className="mb-3">Comments</h3>
                        {/* Task 7: Render comments section by using the map function to go through all the comments */}
                        {comments.map((comment, index) => (
                            <div key={index} className="card-details product-card bg-light">
                                <div className="card-body">
                                    <p className="comment-author"><strong>{comment.author}:</strong></p>
                                    <p className="comment-text">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    </div>
    );
}

export default DetailsPage;

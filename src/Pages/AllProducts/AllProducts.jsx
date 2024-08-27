import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ItemList from '../../Component/ItemList/ItemList';
import ItemDetail from '../../Component/ItemDetail/ItemDetail';
import axios from 'axios';
import "./AllProducts.css"

const AllProducts = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    const [message, setMessage] = useState(''); // State for handling messages
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Handle resize to update mobile state
        const handleResize = () => setIsMobile(window.innerWidth < 769);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Check if the path is for a product detail page
        const id = location.pathname.split('/').pop();
        if (location.pathname.startsWith('/product/') && id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then(response => {
                    setSelectedItem(response.data);
                    setMessage(''); // Clear any existing messages
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setMessage('Error fetching product details.'); 
                });
        } else {
            setSelectedItem(null); 
        }
    }, [location.pathname]);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setMessage(''); 
        if (isMobile) {
            navigate(`/product/${item.id}`);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className={`col-lg-5 ${isMobile ? 'col-12' : 'col-md-5'}`}>
                    <ItemList onSelectItem={handleItemSelect} />
                </div>
                
                {!isMobile && (
                    <div className='col-lg-7'>
                        {selectedItem ? (
                            <ItemDetail item={selectedItem} />
                        ) : (
                            <div className='error-message'>
                                <span>Nothing to display...</span>
                                <h6>{message || 'Select an item to display.'}</h6>
                                <p className='text-muted'>Select an item from the master view to display details in the detail view</p>
                            </div>
                            
                        )}
                    </div>
                )}
            </div>
            
            {isMobile && selectedItem && (
                <div className='row'>
                    <div className="col-12">
                        <ItemDetail item={selectedItem} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;

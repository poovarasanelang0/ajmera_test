import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "./ItemList.css";

function ItemList({ onSelectItem }) {
    const [items, setItems] = React.useState([]);
    const navigate = useNavigate();
    const isMobile = window.innerWidth < 992;

    React.useEffect(() => {
        axios.get('https://fakestoreapi.com/products/')
            .then(response => setItems(response.data));
    }, []);

    const handleItemClick = (item) => {
        onSelectItem(item);
        if (isMobile) {
            navigate(`/product/${item.id}`);
        } else {
            // Pass item details to the parent component
            onSelectItem(item);
        }
    };

    return (
        <div className="container my-1">
            <div className='scroll_down'>
                {items.slice(0, 8).map(item => (
                    <div
                        className={`card mb-4 mx-1`}
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="image-container ">
                                    <img src={item.image} alt={item.title} />
                                </div>
                               
                            </div>
                            <div className="col-md-8 d-flex flex-column justify-content-center">
                                <div className="card-body">
                                    <span className='text_color'>{item.category}</span>
                                    <h6 className="card-title fw-bold">{item.title}</h6>
                                    <p className='text-secondary text-truncate' style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {item.description}
                                    </p>
                                    <p className="card-text fw-bold">${item.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemList;

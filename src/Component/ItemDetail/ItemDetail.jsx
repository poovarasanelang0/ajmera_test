import React from 'react';
import "./ItemDetail.css"

function ItemDetail({ item }) {
  console.log("item", item);
  const { rating } = item;
  
  const stars = [1, 2, 3, 4, 5].map(star => (
    <i 
      key={star} 
      className={`bi bi-star-fill ${star <= Math.floor(rating.rate) ? 'text-warning' : 'text-muted'} px-1`} 
    />
  ));


  return (
    <div className="container my-3">
      <div className="row ">
        <div className="col-md-12 ">
          <div className='img-container'>
            <img src={item.image} className="img-fluid" alt={item.title} />
          </div>
          <div className="card  border-0 ">
            <div className="card-body">
              <p className="card-text colore_to">{item.category}</p>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text text-secondary">{item.description}</p>
              <p className="card-text">
                {stars}
                <span className='mx-3'>{rating.rate}</span>
                <span className='text-muted mx-2'>{rating.count} reviews</span>
              </p>
              <h6 className="card-subtitle mb-2 fw-bold">Price: ${item.price}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;

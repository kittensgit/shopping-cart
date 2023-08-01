import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { addItem } from '../redux/action';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addItem(product));
    };

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(
                `https://fakestoreapi.com/products/${id}`
            );
            setProduct(await response.json());
            setLoading(false);
        };
        getProduct();
    }, [id]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton
                        height={50}
                        width={100}
                        style={{ marginLeft: 6 }}
                    />
                </div>
            </>
        );
    };

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        width={'400px'}
                        height={'400px'}
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button
                        className="btn btn-outline-dark"
                        onClick={() => addProduct(product)}
                    >
                        Add to Cart
                    </button>
                    <NavLink
                        to="/cart"
                        className="btn btn-outline-dark ms-2 px-3 py-2"
                    >
                        Go to Cart
                    </NavLink>
                </div>
            </>
        );
    };

    return (
        <div className="container py-5">
            <div className="row py-4">
                {loading ? <Loading /> : <ShowProduct />}
            </div>
        </div>
    );
};

export default Product;

'use client'
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Compare, CartTwo, Times, HeartTwo } from "@svg/index";
import SocialLinks from "@components/social";
import OldNewPrice from "@components/products/old-new-price";
import Quantity from "@components/products/quantity";
import ProductCategories from "@components/products/product-categories";
import ProductTags from "@components/products/product-tags";
import { add_cart_product, initialOrderQuantity } from "src/redux/features/cartSlice";
import Link from "next/link";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";
import { Modal } from "react-bootstrap";
import { handleModalShow } from "src/redux/features/productSlice";

const ProductModal = () => {
  const { product, isShow } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { _id, image, relatedImages, title, tags, SKU, price, discount, originalPrice, sku } = product || {};
  const [activeImg, setActiveImg] = useState(image);
  const dispatch = useDispatch();
  const isWishlistAdded = wishlist.some((item) => item._id === _id);
  
  if(!product) return null;

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // initial Order Quantity
  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };
  // handle modal close 
  const handleModalClose = () => {
    dispatch(handleModalShow())
    dispatch(initialOrderQuantity())
  }

  console.log(relatedImages,'relatedImages');

  return (
    <Modal
      show={isShow}
      onHide={() => dispatch(handleModalShow())}
      className="product__modal"
      centered={true}
    >
      <div className="product__modal-wrapper">
        <div className="product__modal-close">
          <button
            className="product__modal-close-btn"
            type="button"
            onClick={() => handleModalClose()}
          >
            <Times />
          </button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="product__modal-thumb-wrapper">
              <div className="product__details-thumb-tab mr-40">
                <div className="product__details-thumb-content w-img">
                  <div className="tab-content" id="nav-tabContent">
                    <div className="active-img">
                      <Image
                        priority
                        src={activeImg}
                        alt="image"
                        width={510}
                        height={485}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="product__details-thumb-nav tp-tab">
                  <nav>
                    <div className="nav nav-tabs justify-content-sm-between">
                      {relatedImages.map((img, i) => (
                        <button
                          key={i}
                          className={`nav-link ${img === activeImg ? "active" : ""
                            }`}
                          onClick={() => setActiveImg(img)}
                        >
                          <Image
                            priority
                            src={img}
                            alt="image"
                            width={90}
                            height={90}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product__details-wrapper">
              <h3 className="product__details-title">{title}</h3>
              <p className="mt-20">
                Shop Harry.com for every day low prices. Free shipping on
                orders ₹500+ or Pickup In-store and get
              </p>
              {/* Price */}
              <OldNewPrice
                originalPrice={originalPrice}
                discount={discount}
              />
              {/* Price */}

              {/* quantity */}
              <Quantity />
              {/* quantity */}
              <div className="product__details-action d-flex flex-wrap align-items-center">
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className="product-add-cart-btn product-add-cart-btn-3"
                >
                  <CartTwo />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddWishlist(product)}
                  type="button"
                  className={`product-action-btn ${isWishlistAdded ? "active" : ""
                    }`}
                >
                  <HeartTwo />
                  <span className="product-action-tooltip">
                    Add To Wishlist
                  </span>
                </button>
                <Link href={`/product-details/${_id}`}>
                  <button type="button" className="product-action-btn">
                    <i className="fa-solid fa-link"></i>
                    <span className="product-action-tooltip">
                      Product Details
                    </span>
                  </button>
                </Link>
              </div>
              <div className="product__details-sku product__details-more">
                <p>SKU:</p>
                <span>{sku}</span>
              </div>
              {/* Product Categories */}
              <ProductCategories />
              {/* Product Categories */}

              {/* Tags */}
              <ProductTags tag={tags} />
              {/* Tags */}
              <div className="product__details-share">
                <span>Share:</span>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;

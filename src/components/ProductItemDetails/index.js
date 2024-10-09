import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom' // Import withRouter
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    productItemDetailsList: {},
    similarProducts: [],
    isLoading: true,
    hasError: false,
    countProduct: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  onClickDecrement = () => {
    const {countProduct} = this.state
    if (countProduct > 1) {
      this.setState(prevState => ({countProduct: prevState.countProduct - 1}))
    }
  }

  onClickIncrement = () => {
    this.setState(prevState => ({
      countProduct: prevState.countProduct + 1,
    }))
  }

  getProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const data = await response.json()

    if (response.ok) {
      const updatedProductData = {
        id: data.id,
        price: data.price,
        imageUrl: data.image_url,
        title: data.title,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      const similarProductItemData = data.similar_products.map(product => ({
        id: product.id,
        imageUrl: product.image_url,
        title: product.title,
        price: product.price,
        brand: product.brand,
        rating: product.rating,
      }))
      this.setState({
        productItemDetailsList: updatedProductData,
        similarProducts: similarProductItemData,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, hasError: true})
    }
  }

  renderProductDetails = () => {
    const {productItemDetailsList, countProduct} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productItemDetailsList

    return (
      <div className="productItemDetailsContainer">
        <img src={imageUrl} alt="product" className="productDetailImage" />
        <div className="productDetailDesc">
          <h1 className="productTitle">{title}</h1>
          <p className="productPrice">Rs {price}/-</p>
          <div className="ratingandReviewContainer">
            <div className="ratingContainer">
              <p className="productRating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="reviewsContainer">{totalReviews} Reviews</p>
          </div>
          <p className="productDesc">{description}</p>
          <p>Available: {availability}</p>
          <p>Brand: {brand}</p>
          <hr className="line" />
          <div className="countofProduct">
            <button
              type="button"
              onClick={this.onClickDecrement}
              data-testid="minus"
              className="iconBtn"
            >
              <BsDashSquare />
            </button>

            <p className="count">{countProduct}</p>
            <button
              type="button"
              onClick={this.onClickIncrement}
              data-testid="plus"
              className="iconBtn"
            >
              <BsPlusSquare />
            </button>
          </div>
          <button type="button" className="addCartBtn">
            Add to Cart
          </button>
        </div>
      </div>
    )
  }

  renderSimilarProducts = () => {
    const {similarProducts} = this.state

    return (
      <div className="similar-products-container">
        <h2>Similar Products</h2>
        <ul className="similar-products-list">
          {similarProducts.map(product => (
            <SimilarProductItem key={product.id} product={product} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductandSimilarProductDetails = () => {
    const {isLoading, hasError} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }

    if (hasError) {
      return (
        <div className="error-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="failure view"
          />
          <h1>Product Not Found</h1>
          <button
            type="button"
            onClick={this.handleContinueShopping}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      )
    }

    return (
      <>
        <Header />
        {this.renderProductDetails()}
        {this.renderSimilarProducts()}
      </>
    )
  }

  handleContinueShopping = () => {
    const {history} = this.props
    history.push('/products') // Navigate to the Products route
  }

  render() {
    return this.renderProductandSimilarProductDetails()
  }
}

// Wrap your component with withRouter
export default withRouter(ProductItemDetails)

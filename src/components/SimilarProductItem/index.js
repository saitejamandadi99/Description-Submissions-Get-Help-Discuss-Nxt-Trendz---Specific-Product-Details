// Write your code here
import './index.css'
const SimilarProductItem = props => {
  const {product} = props
  const {imageUrl, title, price, brand, rating} = product
  return (
    <li className="listItemSimilarProduct">
      <img
        src={imageUrl}
        alt="similar product"
        className="SimilarProductItemimage"
      />
      <h1 className="similarPrdHeading">{title}</h1>
      <p>by {brand}</p>
      <p className="sproductPrice">Rs {price}/-</p>
      <div className="ratingContainer">
        <p className="productRating">{rating}</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          alt="star"
          className="star"
        />
      </div>
    </li>
  )
}

export default SimilarProductItem

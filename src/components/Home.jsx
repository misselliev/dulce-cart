// import productList from '../data/productList.json'
import cartSlice from '../data/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../data/productSlice'
import '../styles/home.scss'
import { useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  // const { cartProductIds } = useSelector((state) => state.cartProductIds)
  const state = useSelector((state) => state)
  const { cart, products } = state
  const { addToCart, removeFromCart } = cartSlice.actions 

  useEffect(() => {
    dispatch(fetchAllProducts('http://localhost:3000/products'))
  }, [dispatch])

  return (
    <div className="container product-catalogue">
      <div className="row">
        {products.map((product) => {
          return (
            <div className="wrapper col-md-4" key={product.id}>
              <div className="card">
                <img className="card-img-top center-block" src={product.imageUrl} alt="Card cap" />

                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>

                  {!cart.cartProductIds.includes(product.id) && (<button className="btn btn-primary" onClick={()=> dispatch(addToCart)}>Add To Cart</button>)}
                  {cart.cartProductIds.includes(product.id) && (<button className="btn btn-primary" onClick={()=> dispatch(removeFromCart)}>Remove From Cart</button>)}

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
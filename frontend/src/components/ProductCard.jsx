import React, {useState, useEffect} from 'react'
import './ProductCard.css'

export default function ProductCard(props) {

  const [editBtn, setEditBtn] = useState(false)

  const [editProductState, setEditProductState] = useState({
    id: props.id,
    title: props.title,
    publisher: props.publisher,
    genre: props.genre,
    price: props.price
  })


//editProduct
// returns {
//     key: uuidv4(),
//       id: 4,
//       title: "Total War: Warhammer III",
//       publisher: "Sega",
//       genre: "Strategy",
//       price: 49.99
// }
const editProductFunc = () => {
  // full manual
  // props.editProduct({
  //   key: editProductState.key,
  //   id: editProductState.id,
  //   title: editProductState.title,
  //   publisher: editProductState.publisher,
  //   genre: editProductState.genre,
  //   price: editProductState.price
  // })

  //assuming the state does not include key or id
  // prop.editProduct({
  //     key: props.key,
  //     id: props.id,
  //     ...editProductState
  // })

  // works only if all values are in the state (editProductState)
    props.editProduct(editProductState)
    setEditBtn(false)
}
const onChangeHandler = (e) => {
  (e.target.name === 'price') ?
  setEditProductState({
    ...editProductState,
    [e.target.name]: parseFloat(parseFloat(e.target.value).toFixed(2))})
  :
  setEditProductState({
    ...editProductState,
    [e.target.name]: e.target.value})
}


  return (
    <div className='product-card'>
      <h2><u>{props.title}</u></h2>
        {
          editBtn ? (
              <div>
                <label htmlFor='title'>Title: </label>
                <input 
                  type='text'
                  name='title'
                  value={editProductState.title}
                  onChange={onChangeHandler}
                /><br/>
                <label htmlFor='publisher'>Publisher: </label>
                <input 
                  type='text'
                  name='publisher'
                  value={editProductState.publisher}
                  onChange={onChangeHandler}
                /><br/>
                <label htmlFor='genre'>Genre: </label>
                <input
                  type='text'
                  name='genre'
                  value={editProductState.genre}
                  onChange={onChangeHandler}
                /><br/>
                <label htmlFor='price'>Price: </label>
                <input
                  type='number'
                  name='price'
                  step='.01'
                  min='0'
                  value={editProductState.price}
                  onChange={onChangeHandler}
                /><br/>
                <button onClick={editProductFunc}>Save Changes</button>

              </div>
            ) : (
              <>
                <p>Publisher: {props.publisher}</p>
                <p>Genre: {props.genre}</p>
                <p>Price: ${props.price}</p> 
              </>
              )
            }

       <button onClick={()=> setEditBtn(!editBtn)}>Toggle Edit</button>

       <button onClick={() => props.deleteProduct(props.id)} >Delete!</button>
    </div>
  )
}

import { v4 as uuidv4 } from 'uuid';

export default function productReducer (productState, action) {
    switch (action.type) {
        case 'DELETE_PRODUCT':
            // removes from product arrary
            // filter test if passed id (product_id) matches the current element, if true, return false so filter does not pass it to the new array
            // let filteredArr = productState.filter(product => 
            //     (product.id !== action.product_id))
            // or
            let filteredArr = productState.filter(product => 
                (product.id === action.product_id) ? false : true)
            // return new array
            return filteredArr
        case 'EDIT_PRODUCT':
            // modify the one object matching the id with the new object action.data          
            let productCopy = productState.map( product => product.id === action.data.id ? action.data : product)
            return productCopy
        case "ADD_BLANK":
            //create new blank card
            let blankCard = {
                id: uuidv4(),
                title: "",
                publisher: "",
                genre: "",
                price: 0.00
            }
            // let newState = [
            //     blankCard,
            //     ...productState
            // ]
            // console.log(newState);
           
            return [
                blankCard,
                ...productState
            ]
        case "ADD_API":
            let payload = {
                name: 'Doom',
                gamespublisher: 'Bethesda',
                studio: 'id Software',
                ratings: 5,
                genre: 'FPS',
                price: 40,
              }
            let newCard = 
            {
                id: uuidv4(),
                title: payload.name,
                publisher: payload.gamespublisher,
                studio: payload.studio,
                genre: payload.genre,
                price: payload.price
            }
            return [
                newCard,
                ...productState
            ]
        case "ADD_PAYLOAD":
            console.log(action.payload)
            let payloadArr = action.payload.map(e => {
                return {
                    id: uuidv4(),
                    title: e.gameTitle,
                    publisher: e.publisherName,
                    genre: e.genre,
                    price: e.MSRP
                }
            })

            return [...payloadArr, ...productState]
        default:
            return productState
    }
    
    
}
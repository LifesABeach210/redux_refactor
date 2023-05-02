import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const startingState = [
  {
    id: uuidv4(),
    title: "Hogwart's Legacy",
    publisher: "Warner Bros.",
    genre: "Adventure",
    price: 59.99,
  },
  {
    id: uuidv4(),
    title: "Destiny 2",
    publisher: "Bungie",
    genre: "FPS",
    price: 29.99,
  },
  {
    id: uuidv4(),
    title: "The Last of Us",
    publisher: "Sony",
    genre: "Adventure",
    price: 69.99,
  },
  {
    id: uuidv4(),
    title: "Total War: Warhammer III",
    publisher: "Sega",
    genre: "Strategy",
    price: 49.99,
  },
  {
    id: uuidv4(),
    title: "Dune",
    publisher: "Warner Bros.",
    genre: "Sci-Fi",
    price: 19.99,
  },
];

export const createProduct = createAsyncThunk(
  "user/createProduct",
  async (productData) => {
    let response = productData;
    console.log(response);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: startingState,
  reducers: {
    deleteProduct: (state, action) => {
      console.log(action);
      let filteredArr = state.filter((product) =>
        product.id === action.payload ? false : true
      );
      return filteredArr;
    },
    editProduct: (state, action) => {
      let productCopy = startingState.map((product) => {
        // product.id === action.payload ? action.data :
        if (product.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return product;
        }
      });
      return productCopy;
    },
    addBlank: (state, action) => {
      let blankCard = {
        id: uuidv4(),
        title: "",
        publisher: "",
        genre: "",
        price: 0.0,
      };
      console.log(state);
      return [blankCard, ...state];
    },
    addApi: (state, action) => {
      let payload = {
        name: "Doom",
        gamespublisher: "Bethesda",
        studio: "id Software",
        ratings: 5,
        genre: "FPS",
        price: 40,
      };
      let newCard = {
        id: uuidv4(),
        title: payload.name,
        publisher: payload.gamespublisher,
        studio: payload.studio,
        genre: payload.genre,
        price: payload.price,
      };
      return [newCard, ...state];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.title = action.payload.title;
      state.publisher = action.payload.publisher;
      state.genre = action.payload.genre;
      state.price = action.payload.price;
    });
  },
});

export const { deleteProduct, editProduct, addBlank, addApi } =
  productSlice.actions;

export default productSlice.reducer;

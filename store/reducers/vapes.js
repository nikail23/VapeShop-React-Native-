import {
  REQUESTED_VAPE_LOADING,
  FETCH_VAPE_SUCCEEDED,
  DELETE_VAPE_SUCCEEDED,
  CREATE_VAPE_SUCCEEDED,
  UPDATE_VAPE_SUCCEEDED,
  SET_FILTERS,
  SET_SETTINGS,
} from "../actions/vapes";
import Vape from "../../models/vape";

const initialFilters = {
  descriptionSize: false,
  imagesCount: "0",
  minPrice: 0,
  price: "103",
};

const initialSettings = {
  bgColor: "#F2F2F2",
  darkmode: false,
  language: "eng",
  mainColor: "black",
  sizeOfFont: 16,
};

const initialState = {
  availableVape: [],
  filteredVape: [],
  filters: initialFilters,
  settings: initialSettings,
  userVape: [],
  loading: false,
  // error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_VAPE_LOADING:
      return {
        ...state,
        loading: true,
        // error: false,
      };
    case FETCH_VAPE_SUCCEEDED:
      return {
        ...state,
        availableVape: action.vape,
        userVape: action.userVape,
        loading: false,
        // error: false,
      };

    case CREATE_VAPE_SUCCEEDED:
      const newVape = new Vape(
        action.id,
        action.ownerId,
        action.name,
        action.description,
        action.imageUrls,
        action.videoUrl,
        action.price,
        action.weight,
        action.battery,
        action.selectedLocation,
      );
      return {
        ...state,
        availableVape: state.availableVape.concat(newVape),
        userVape: state.userVape.concat(newVape),
        loading: false,
        // error: false,
      };
    case UPDATE_VAPE_SUCCEEDED:
      const vapeIndex = state.userVape.findIndex(
        (vape) => vape.id === action.vapeId
      );
      const updatedVape = new Vape(
        action.vapeId,
        state.userVape[vapeIndex].ownerId,
        action.vapeData.name,
        action.vapeData.description,
        action.vapeData.imageUrls,
        action.vapeData.videoUrl,
        state.userVape[vapeIndex].price,
        action.vapeData.weight,
        action.vapeData.battery,
        action.vapeData.selectedLocation
      );
      const updatedUserVape = [...state.userVape];
      updatedUserVape[vapeIndex] = updatedVape;
      const availableVapeIndex = state.availableVape.findIndex(
        (vape) => vape.id === action.vapeId
      );
      const updatedAvailableVape = [...state.availableVape];
      updatedAvailableVape[availableVapeIndex] = updatedVape;
      return {
        ...state,
        availableVape: updatedAvailableVape,
        userVape: updatedUserVape,
        loading: false,
        // error: false,
      };
    case DELETE_VAPE_SUCCEEDED:
      return {
        ...state,
        userVape: state.userVape.filter(
          (vape) => vape.id !== action.vapeId
        ),
        availableVape: state.availableVape.filter(
          (vape) => vape.id !== action.vapeId
        ),
        loading: false,
        // error: false,
      };
    case SET_FILTERS:
      const filters = action.filters ? action.filters : state.filters;
      const newFilteredVape = state.availableVape.filter((vape) => {
        if (vape.price < filters.minPrice || vape.price > filters.price) {
          return false;
        }
        if (vape.imageUrls.length < filters.imagesCount) {
          console.log(vape.imageUrls);
          return false;
        }
        if (vape.description.length < 20 && filters.descriptionSize) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredVape: newFilteredVape,
        filters: filters,
      };
    case SET_SETTINGS:
      return {
        ...state,
        settings: action.settings,
      };
  }
  return state;
};

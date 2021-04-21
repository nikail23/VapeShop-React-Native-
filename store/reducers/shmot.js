import {
  REQUESTED_SHMOT_LOADING,
  FETCH_SHMOT_SUCCEEDED,
  DELETE_SHMOT_SUCCEEDED,
  CREATE_SHMOT_SUCCEEDED,
  UPDATE_SHMOT_SUCCEEDED,
  SET_FILTERS,
  SET_SETTINGS,
} from "../actions/shmot";
import Shmot from "../../models/shmot";

const initialFilters = {
  color: "all",
  descriptionSize: false,
  imagesCount: "0",
  minPrice: 0,
  price: "103",
  shmotType: "all",
};

const initialSettings = {
  bgColor: "#F2F2F2",
  darkmode: false,
  language: "eng",
  mainColor: "black",
  sizeOfFont: 16,
};

const initialState = {
  availableShmot: [],
  filteredShmot: [],
  filters: initialFilters,
  settings: initialSettings,
  userShmot: [],
  loading: false,
  // error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_SHMOT_LOADING:
      return {
        ...state,
        loading: true,
        // error: false,
      };
    case FETCH_SHMOT_SUCCEEDED:
      return {
        ...state,
        availableShmot: action.shmot,
        userShmot: action.userShmot,
        loading: false,
        // error: false,
      };

    case CREATE_SHMOT_SUCCEEDED:
      const newShmot = new Shmot(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrls,
        action.videoUrl,
        action.shmotType,
        action.color,
        action.description,
        action.price,
        action.selectedLocation
      );
      return {
        ...state,
        availableShmot: state.availableShmot.concat(newShmot),
        userShmot: state.userShmot.concat(newShmot),
        loading: false,
        // error: false,
      };
    case UPDATE_SHMOT_SUCCEEDED:
      const shmotIndex = state.userShmot.findIndex(
        (shmot) => shmot.id === action.shmotId
      );
      const updatedShmot = new Shmot(
        action.shmotId,
        state.userShmot[shmotIndex].ownerId,
        action.shmotData.title,
        action.shmotData.imageUrls,
        action.shmotData.videoUrl,
        action.shmotData.shmotType,
        action.shmotData.color,
        action.shmotData.description,
        state.userShmot[shmotIndex].price,
        action.shmotData.selectedLocation
      );
      const updatedUserShmot = [...state.userShmot];
      updatedUserShmot[shmotIndex] = updatedShmot;
      const availableShmotIndex = state.availableShmot.findIndex(
        (shmot) => shmot.id === action.shmotId
      );
      const updatedAvailableShmot = [...state.availableShmot];
      updatedAvailableShmot[availableShmotIndex] = updatedShmot;
      return {
        ...state,
        availableShmot: updatedAvailableShmot,
        userShmot: updatedUserShmot,
        loading: false,
        // error: false,
      };
    case DELETE_SHMOT_SUCCEEDED:
      return {
        ...state,
        userShmot: state.userShmot.filter(
          (shmot) => shmot.id !== action.shmotId
        ),
        availableShmot: state.availableShmot.filter(
          (shmot) => shmot.id !== action.shmotId
        ),
        loading: false,
        // error: false,
      };
    case SET_FILTERS:
      const filters = action.filters ? action.filters : state.filters;
      const newFilteredShmot = state.availableShmot.filter((shmot) => {
        if (shmot.price < filters.minPrice || shmot.price > filters.price) {
          return false;
        }
        if (shmot.type !== filters.shmotType && filters.shmotType !== "all") {
          return false;
        }
        if (shmot.color !== filters.color && filters.color !== "all") {
          return false;
        }
        if (shmot.imageUrls.length < filters.imagesCount) {
          return false;
        }
        if (shmot.description.length < 20 && filters.descriptionSize) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredShmot: newFilteredShmot,
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

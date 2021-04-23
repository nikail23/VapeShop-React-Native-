export const REQUESTED_VAPE_LOADING = "REQUESTED_VAPE_LOADING";
export const FETCH_VAPE = "FETCH_VAPE";
export const FETCH_VAPE_SUCCEEDED = "FETCH_VAPE_SUCCEEDED";
export const CREATE_VAPE = "CREATE_VAPE";
export const CREATE_VAPE_SUCCEEDED = "CREATE_VAPE_SUCCEEDED";
export const UPDATE_VAPE = "UPDATE_VAPE";
export const UPDATE_VAPE_SUCCEEDED = "UPDATE_VAPE_SUCCEEDED";
export const DELETE_VAPE = "DELETE_VAPE";
export const DELETE_VAPE_SUCCEEDED = "DELETE_VAPE_SUCCEEDED";
export const SET_FILTERS = "SET_FILTERS";
export const SET_SETTINGS = "SET_SETTINGS";

export const requestedVapeLoading = () => {
  return { type: REQUESTED_VAPE_LOADING };
};

export const fetchVape = () => {
  return { type: FETCH_VAPE };
};

export const fetchVapeSucceeded = (vape, userVape) => {
  const result = {
    type: FETCH_VAPE_SUCCEEDED,
    vape,
    userVape,
  };
  return result;
};

export const deleteVape = (vapeId) => {
  return { type: DELETE_VAPE, vapeId };
};

export const deleteVapeSucceeded = (vapeId) => {
  return { type: DELETE_VAPE_SUCCEEDED, vapeId };
};

export const createVape = (
  name,
  imageUrls,
  videoUrl,
  selectedLocation,
  price,
  description,
  weight,
  battery
) => {
  return {
    type: CREATE_VAPE,
    name,
    imageUrls,
    videoUrl,
    selectedLocation,
    price,
    description,
    weight,
    battery
  };
};

export const createVapeSucceeded = (
  id,
  name,
  imageUrls,
  videoUrl,
  selectedLocation,
  price,
  description,
  ownerId,
  weight,
  battery
) => {
  return {
    type: CREATE_VAPE_SUCCEEDED,
    id,
    name,
    imageUrls,
    videoUrl,
    selectedLocation,
    price,
    description,
    ownerId,
    weight,
    battery
  };
};

export const updateVape = (
  id,
  name,
  imageUrls,
  videoUrl,
  selectedLocation,
  description,
  weight,
  battery
) => {
  return {
    type: UPDATE_VAPE,
    id,
    name,
    imageUrls,
    videoUrl,
    selectedLocation,
    description,
    weight,
    battery
  };
};

export const updateVapeSucceeded = (vapeId, vapeData) => {
  return { type: UPDATE_VAPE_SUCCEEDED, vapeId, vapeData };
};

export const setFilters = (filters) => {
  return { type: SET_FILTERS, filters };
};

export const setSettings = (settings) => {
  return { type: SET_SETTINGS, settings };
};

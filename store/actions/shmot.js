export const REQUESTED_SHMOT_LOADING = "REQUESTED_SHMOT_LOADING";
export const FETCH_SHMOT = "FETCH_SHMOT";
export const FETCH_SHMOT_SUCCEEDED = "FETCH_SHMOT_SUCCEEDED";
export const CREATE_SHMOT = "CREATE_SHMOT";
export const CREATE_SHMOT_SUCCEEDED = "CREATE_SHMOT_SUCCEEDED";
export const UPDATE_SHMOT = "UPDATE_SHMOT";
export const UPDATE_SHMOT_SUCCEEDED = "UPDATE_SHMOT_SUCCEEDED";
export const DELETE_SHMOT = "DELETE_SHMOT";
export const DELETE_SHMOT_SUCCEEDED = "DELETE_SHMOT_SUCCEEDED";
export const SET_FILTERS = "SET_FILTERS";
export const SET_SETTINGS = "SET_SETTINGS";

export const requestedShmotLoading = () => {
  return { type: REQUESTED_SHMOT_LOADING };
};

export const fetchShmot = () => {
  return { type: FETCH_SHMOT };
};

export const fetchShmotSucceeded = (shmot, userShmot) => {
  const result = {
    type: FETCH_SHMOT_SUCCEEDED,
    shmot,
    userShmot,
  };
  return result;
};

export const deleteShmot = (shmotId) => {
  return { type: DELETE_SHMOT, shmotId };
};

export const deleteShmotSucceeded = (shmotId) => {
  return { type: DELETE_SHMOT_SUCCEEDED, shmotId };
};

export const createShmot = (
  title,
  imageUrls,
  videoUrl,
  selectedLocation,
  price,
  description,
  weight,
  battery
) => {
  return {
    type: CREATE_SHMOT,
    title,
    imageUrls,
    videoUrl,
    selectedLocation,
    price,
    description,
    weight,
    battery
  };
};

export const createShmotSucceeded = (
  id,
  title,
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
    type: CREATE_SHMOT_SUCCEEDED,
    id,
    title,
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

export const updateShmot = (
  id,
  title,
  imageUrls,
  videoUrl,
  selectedLocation,
  description,
  weight,
  battery
) => {
  return {
    type: UPDATE_SHMOT,
    id,
    title,
    imageUrls,
    videoUrl,
    selectedLocation,
    description,
    weight,
    battery
  };
};

export const updateShmotSucceeded = (shmotId, shmotData) => {
  return { type: UPDATE_SHMOT_SUCCEEDED, shmotId, shmotData };
};

export const setFilters = (filters) => {
  return { type: SET_FILTERS, filters };
};

export const setSettings = (settings) => {
  return { type: SET_SETTINGS, settings };
};

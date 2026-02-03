
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "./newsTypes";

export const fetchNewsRequest = () => {
  console.log("STEP1: Action creator called");

  return {
    type: FETCH_NEWS_REQUEST,
  };
};

export const fetchNewsSuccess = (data: string[]) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: data,
});

export const fetchNewsFailure = (error: string) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error,
});
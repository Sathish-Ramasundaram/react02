import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "./newsTypes";

type NewsState = {
  loading: boolean;
  data: string[];
  error: string | null;
};

const initialState: NewsState = {
  loading: false,
  data: [],
  error: null,
};

export default function newsReducer(
  state = initialState,
  action: any
): NewsState {

      console.log("STEP7: Reducer received:", action.type);

  switch (action.type) {
    case FETCH_NEWS_REQUEST:
        console.log("STEP8: Reducer sets loading = true");
      return { ...state, loading: true, error: null };

    case FETCH_NEWS_SUCCESS:
          console.log("STEP9: Reducer sets loading = false and stores data");
      return { loading: false, data: action.payload, error: null };

    case FETCH_NEWS_FAILURE:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
}

const initialState = {
  news: [],
  loading: false,
};

export default function newsReducer(state = initialState, action: any) {
  switch (action.type) {
    case "NEWS_REQUEST":
      return { ...state, loading: true };

    case "NEWS_SUCCESS":
      return { news: action.payload, loading: false };

    default:
      return state;
  }
}

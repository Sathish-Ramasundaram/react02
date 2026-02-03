import { useDispatch, useSelector } from "react-redux";
import { fetchNewsRequest } from "../redux/news/newsActions";
import { RootState } from "../redux/rootReducer";

function ReduxNewsPage() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.news
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Redux Saga News Demo Page
      </h1>

      <button
        onClick={() => dispatch(fetchNewsRequest())}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Fetch News (Redux Saga)
      </button>

      {loading && <p className="mt-3">Loading...</p>}

      {error && (
        <p className="mt-3 text-red-600">
          Error: {error}
        </p>
      )}

      <ul className="mt-4 list-disc ml-6">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReduxNewsPage;

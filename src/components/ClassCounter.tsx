import React from "react";

type State = {
  count: number;
};

class ClassCounter extends React.PureComponent<{}, State> {
  state: State = {
    count: 0,
  };

  render() {

  console.log("ClassCounter rendered");
    return (
      <div className="mt-4 border p-3 rounded">
        <p>Class Count: {this.state.count}</p>

        <button
          onClick={() =>
            this.setState({ count: this.state.count + 1 })
          }
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          Class Increment
        </button>




      </div>
    );
  }
}

export default ClassCounter;

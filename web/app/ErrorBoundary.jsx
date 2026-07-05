import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "Unknown error"
    };
  }

  componentDidCatch(error, info) {
    console.error("TalkFreeAAC UI crash:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="releaseCrashScreen">
        <section>
          <h1>TalkFreeAAC recovered safely</h1>
          <p>
            The communication board hit an error, but your local profile was not intentionally deleted.
          </p>
          <pre>{this.state.errorMessage}</pre>
          <button onClick={this.reset}>Try again</button>
        </section>
      </main>
    );
  }
}

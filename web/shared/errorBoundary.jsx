import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("TalkFreeAAC UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="panel">
          <h2>Something went wrong.</h2>
          <p>The AAC board can be reloaded. Your local data should remain saved.</p>
          <button className="control" onClick={() => window.location.reload()}>Reload App</button>
        </div>
      );
    }

    return this.props.children;
  }
}

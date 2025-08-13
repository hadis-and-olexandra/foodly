import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist or the URL is incorrect.
      </p>
      <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-950">
      <div className="space-y-4">
        <h1 className="app__top text-white font-Jost text-4xl font-bold text-center">Welcome to Invenflow UI</h1>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="btn px-4 py-2 text-white bg-blue-500 rounded">
            Login
          </Link>
          <Link to="/register" className="btn btn_outline px-4 py-2 text-white bg-blue-500 rounded">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

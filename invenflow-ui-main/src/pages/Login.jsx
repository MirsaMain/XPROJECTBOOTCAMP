import { Form, useActionData, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return { token: data.token };
  } else {
    return { error: "Invalid email or password" };
  }
}

export default function Login() {
  const actionData = useActionData();
  const { login } = useAuth();

  if (actionData?.token) {
    login(actionData.token);
    return <Navigate to="/products" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-green-900 rounded shadow-md">
        <h2 className="text-white font-Jost text-3xl font-bold text-center">
          <span className="text-yellow-500">Log</span>in
        </h2>
        {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
        <Form method="post" action="/login">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input type="email" name="email" id="email" required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input type="password" name="password" id="password" required className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="btn w-full py-2 font-bold text-white rounded">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

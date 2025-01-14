import { Form, useActionData, Navigate } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { error: "All fields are required" };
  }
}

export default function Register() {
  const actionData = useActionData();

  if (actionData?.success) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-green-900 rounded shadow-md">
        <h2 className="text-white text-2xl font-Jost font-bold text-center">Register</h2>
        {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
        <Form method="post" action="/register">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input type="text" name="name" id="name" required className="w-full px-3 py-2 border rounded" />
            </div>
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
            <button type="submit" className="btn w-full py-2 text-white font-bold bg-yellow-500 rounded">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

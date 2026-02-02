export async function loginApi(email: string, password: string) {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  // ⏳ Artificial delay (2 seconds)
await new Promise((resolve) => setTimeout(resolve, 2000));


  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}


export async function fetchMe() {
  const res = await fetch("http://localhost:4000/me");
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
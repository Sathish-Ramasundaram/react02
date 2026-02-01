export async function loginApi(email: string, password: string) {
  console.log("loginApi called with:");
  console.log("Email:", email);
  console.log("Password:", password);

   // ⏳ Artificial delay (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (email !== "test@example.com") {
    throw new Error("Invalid credentials");
  }

  return { success: true };
}

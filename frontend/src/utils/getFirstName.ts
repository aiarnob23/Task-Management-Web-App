import Cookies from "js-cookie";

export const getFirstName = () => {
  const fullName = Cookies.get("task-management-app-userName");
  let firstName = "User";
  if (fullName) {
    const nameParts: string[] = fullName.split(" ");
    firstName = nameParts[0] || "User";
    return firstName;
  }
  return firstName;
};

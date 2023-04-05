export const getUserData = () => {
  const user = localStorage.getItem("user")
  if (!user) {
    return null
  } else {
    return JSON.parse(user)
  }
}
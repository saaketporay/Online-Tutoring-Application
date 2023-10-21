
export const checkPermissions = () => {
  const user_type = localStorage.getItem('user_type')
  if (!user_type) {
    return "none"
  }
  return user_type;
}

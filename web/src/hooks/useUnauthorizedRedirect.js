import { useNavigate } from "@tanstack/react-router"

export const useUnauthorizedRedirect = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate({
      to: '/login',
      search: { toastMessage: 'You\'ve been logged out!' },
    });
  }

  return {
    goToLogin
  }
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../api/utils";
import { useUnauthorizedRedirect } from "../hooks/useUnauthorizedRedirect";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { goToLogin } = useUnauthorizedRedirect()
  const { data, error, isLoading } = useQuery({
    queryKey: ["protected"],
    queryFn: () => GET("/api/protected"),
    retry: false,
  })

  if (isLoading) {
    return "... loading"
  }

  if (error) {
    if (error.message.includes("401")) {
      goToLogin()
    }
    console.log(error)
    return "error"
  }

  return (
    <div className="p-2">
      <h3>Template</h3>
      <h2>{data.message}</h2>
    </div>
  );
}

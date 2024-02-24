import { useRouteError } from "react-router-dom";
import { RouteError } from "./types/ErrorElement";

export default function Error() {
  const error = useRouteError() as RouteError | null;

  return (
    <div>
        <h1>Oops!</h1>
       <h3>Error: {error?.message}</h3>
        <pre>{error?.status} - {error?.statusText}</pre>
    </div>
  );
}
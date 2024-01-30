import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  if (error.status === 404) {
    return (
      <main class="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-base font-semibold text-indigo-600">404</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" class="btn btn-primary">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main class="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Error
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          <i>{error.statusText || error.message}</i>
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" class="btn btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;

import { createFileRoute, redirect } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { formOptions, useForm } from '@tanstack/react-form';

import { login, isAuthenticated } from '../api/auth';

export const Route = createFileRoute('/login')({
  component: Login,
  loader: async () => {
    const auth = await isAuthenticated()
    if (auth) throw redirect({ to: "/" })
  }
})

function Login() {
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData) => login(loginData.email, loginData.password)
  });

  const formOpts = formOptions({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      loginMutation.mutate({ email: value.email, password: value.password });
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="dark:text-white text-3xl mb-2 text-center">Login</h3>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <button type="submit" className='border-2'>Login</button>
      </form>
    </div>
  );
}

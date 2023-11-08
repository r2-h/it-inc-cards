import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { CheckEmail } from '@/components/auth/check-email'
import { Layout } from '@/components/layout/layout'
import { Cards } from '@/pages/cards'
import { CreatePasswordPage } from '@/pages/create-password-page'
import { Decks } from '@/pages/decks/decks'
import { Error404 } from '@/pages/error404'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { SignInPage } from '@/pages/sign-in-page'
import { SignUpPage } from '@/pages/sign-up-page'
import { useMeQuery } from '@/services/auth/auth-api'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
  {
    element: <CreatePasswordPage />,
    path: '/create-password/:token',
  },
  {
    element: <CheckEmail />,
    path: '/check-email',
  },
  {
    element: <Error404 />,
    path: '/404',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },

  {
    element: <Cards />,
    path: '/cards/:id',
  },
]

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <div>...loading</div>
  }

  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

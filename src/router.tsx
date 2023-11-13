import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { CheckEmail } from '@/components/auth/check-email'
import { Layout } from '@/components/layout/layout'
import {
  Cards,
  CreatePasswordPage,
  Decks,
  Error404,
  ForgotPasswordPage,
  SignInPage,
  SignUpPage,
} from '@/pages'
import { LearnDeck } from '@/pages/learn-deck/learn-deck'
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
  {
    element: <LearnDeck />,
    path: '/learn-deck/:id',
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

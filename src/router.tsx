import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { Cards } from '@/pages/cards'
import { Decks } from '@/pages/decks/decks'
import { Error404 } from '@/pages/error404'
import { SignInPage } from '@/pages/sign-in-page'
import { SignUpPage } from '@/pages/sign-up-page'

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
  const isAuthenticated = true

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

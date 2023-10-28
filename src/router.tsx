import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Select } from '@/components/ui/select'
import { Decks } from '@/pages/decks'
import { SignInPage } from '@/pages/sign-in-page'
import { SignUpPage } from '@/pages/sign-up-page'
import { useGetDecksQuery } from '@/services/decks/decks'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
]

const Component = () => {
  const { data } = useGetDecksQuery()

  console.log(data)

  return <div>Component 2</div>
}
const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: (
      <>
        <Component />
        <Select
          onChangeValue={() => {}}
          options={[
            { id: '1', value: 'sdfsf' },
            { id: '2', value: 'sdDFFsf' },
          ]}
        />
      </>
    ),
    path: '/2',
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const result = useGetDecksQuery()

  console.log(result)

  return <RouterProvider router={router} />
}

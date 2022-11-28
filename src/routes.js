import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./pages/auth";
import AdminLayout from "./pages/admin";
import Egitimci from "./pages/egitimci";
import Users from "./pages/admin/users/"
import EditUser from "./pages/admin/users/EditUser";
import Categories from "./pages/admin/categories";
import EditCategory from "./pages/admin/categories/EditCategory";
import AddCategory from "./pages/admin/categories/AddCategory";
import Projects from "./pages/admin/projects";
import EditProject from "./pages/admin/projects/EditProject";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const ROLES = {
    1: 'Admin',
    2: 'Ogrenci',
    3: 'Egitimci'
}

const routes = [
    {
        path: '/',
        element: <Home />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/profile',
        element: <Profile />,
        auth: true,
        allowedRoles: [ROLES[1], ROLES[2], ROLES[3]]
    },
    {
        path: '/settings',
        element: <Settings />,
        auth: true,
        allowedRoles: [ROLES[1], ROLES[2], ROLES[3]]
    },

    // ============= AUTH ROUTES START ==================
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    // ============= AUTH ROUTES END ==================

    // ============= ADMIN ROUTES START ==================
    {
        path: '/admin',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: 'users',
                element: <Users />
            }
        ]
    },
    {
        path: '/admin/users',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: ':id',
                element: <EditUser />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: 'categories',
                element: <Categories />
            }
        ]
    },
    {
        path: '/admin/categories',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: ':id',
                element: <EditCategory />
            }
        ]
    },
    {
        path: '/admin/categories',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: 'add',
                element: <AddCategory />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: 'projects',
                element: <Projects />
            }
        ]
    },
    {
        path: '/admin/projects',
        element: <AdminLayout />,
        auth: true,
        allowedRoles: [ROLES[1]],
        children: [
            {
                path: ':id',
                element: <EditProject />
            }
        ]
    },
    // ============= ADMIN ROUTES END ==================

    // ============= EGITIMCI ROUTES START ==================

    {
        path: '/egitimci',
        element: <Egitimci />,
        auth: true,
        allowedRoles: [ROLES[3]]
    }
    // ============= EGITIMCI ROUTES END ==================

]

const authCheck = routes => routes.map(route => {

    if(route?.auth){
        route.element = <PrivateRoute allowedRoles={route?.allowedRoles}>{route.element}</PrivateRoute>
    }

    if(route?.children){
        route.children = authCheck(route.children)
    }

    return route
})

export default authCheck(routes);
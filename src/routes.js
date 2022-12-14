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
import AdminProjects from "./pages/admin/projects";
import EditProject from "./pages/admin/projects/EditProject";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SoruCevap from "./pages/soru-cevap";
import ProfileByUsername from "./pages/ProfileByUsername";
import SoruSor from "./pages/soru-sor";
import SoruDetay from "./pages/soru-detay";
import Projects from "./pages/projects";
import ProjectDetails from "./pages/project-details";
import NewProject from "./pages/new-projects";
import CategoriesList from "./pages/categories.js";
import CategoryDetails from "./pages/categories.js/CategoryDetails";
import TagsList from "./pages/tags";
import TagDetails from "./pages/tags/TagDetails";
import Dashboard from "./pages/dashboard";
import CreateRoom from "./pages/create-room";
import OneOnOneRoom from "./pages/OneOnOneRoom";
import GroupVideoRoom from "./pages/GroupVideoRoom";
import MyRooms from "./pages/MyRooms";
import Rooms from "./pages/rooms";
import JoinRoom from "./pages/JoinRoom";

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
        allowedRoles: [ROLES[2]]
    },
    // ============= VIDEO CHAT ROUTES START ==================
    {
        path: '/dashboard',
        element: <Dashboard />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/create',
        element: <CreateRoom />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/create-1on1-room',
        element: <OneOnOneRoom />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/create-group-room',
        element: <GroupVideoRoom />,
        auth: true,
        allowedRoles: [ROLES[3]]
    },
    {
        path: '/myrooms',
        element: <MyRooms />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/rooms',
        element: <Rooms />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/join/:id',
        element: <JoinRoom />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    // ============= SORU-CEVAP ROUTES START ==================
    {
        path: '/soru-cevap',
        element: <SoruCevap />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/soru-sor',
        element: <SoruSor />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/soru/:id/:title',
        element: <SoruDetay />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    // ============= SORU-CEVAP ROUTES END ==================

    // ============= PROJECT ROUTES START ==================
    {
        path: '/projects',
        element: <Projects />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/projects/:id/:title',
        element: <ProjectDetails />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/yeni-proje',
        element: <NewProject />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    // ============= PROJECTS ROUTES END ==================

    // ============= CATEGORIES ROUTES START ==================
    {
        path: '/categories',
        element: <CategoriesList />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/categories/:name',
        element: <CategoryDetails />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    // ============= CATEGORIES ROUTES END ==================

    // ============= TAGS ROUTES START ==================
    {
        path: '/tags',
        element: <TagsList />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    {
        path: '/tags/:name',
        element: <TagDetails />,
        auth: true,
        allowedRoles: [ROLES[2], ROLES[3]]
    },
    // ============= TAGS ROUTES END ==================

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
    {
        path: '/:username',
        element: <ProfileByUsername />,
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
                element: <AdminProjects />
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
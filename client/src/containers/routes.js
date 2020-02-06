const privateRoutes = [
    {
        path: "/",
        exact: true,
        loader: () => import("./ChatPage"),
        menu: false,
        label: "Trang chủ",
        permissionRequired: null,
        icon: "home"
    }
]

const publicRoutes = [
    {
        path: "/",
        exact: true,
        loader: () => import("./ChatPage"),
        menu: false,
        label: "Trang chủ",
        permissionRequired: null,
        icon: "home"
    }
];


const errorRoutes = [
    {
        path: "/401",
        exact: true,
        loader: () => import("./shared/error/Error401Page")
    },
    {
        path: "/403",
        exact: true,
        loader: () => import("./shared/error/Error403Page")
    },
    {
        path: "/404",
        exact: true,
        loader: () => import("./shared/error/Error404Page")
    },
    {
        path: "/500",
        exact: true,
        loader: () => import("./shared/error/Error500Page")
    }
];

const authRoutes = [
    {
        path: "/signin",
        exact: true,
        loader: () => import("./AuthPage/SigninPage")
    },
    {
        path: "/signup",
        exact: true,
        loader: () => import("./AuthPage/SignupPage")
    },
    {
        path: "/forgot-password",
        exact: true,
        loader: () => import("./AuthPage/ForgotPasswordPage")
    },
    ,
    {
        path: "/verify-email",
        exact: true,
        loader: () => import("./AuthPage/VerifyEmailPage")
    }
];


export default {
    privateRoutes,
    publicRoutes,
    authRoutes,
    errorRoutes
};

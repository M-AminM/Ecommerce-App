export const RoutesData = [
  {
    path: "/",
    pathComponent: "Home",
    isProtected: false,
  },
  {
    path: "/login",
    pathComponent: "Login",
    isProtected: false,
  },
  {
    path: "/product-category/:category",
    pathComponent: "ProductCategory",
    isProtected: false,
  },
  {
    path: "/product-category/:category/:id",
    pathComponent: "Product",
    isProtected: false,
  },
  {
    path: "/cart",
    pathComponent: "Cart",
    isProtected: true,
  },
  {
    path: "/profile",
    pathComponent: "Profile",
    isProtected: true,
  },
];

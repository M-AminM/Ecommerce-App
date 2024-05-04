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
    pathComponent: "ProductsCategory",
    isProtected: false,
  },
  {
    path: "/product-category/:category/:id",
    pathComponent: "ProductItem",
    isProtected: false,
  },
  {
    path: "/cart",
    pathComponent: "Cart",
    isProtected: true,
  },
];

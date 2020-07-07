import Home from "../pages/Home";
import ABMPosts from "../pages/ABMPosts";
import ABMAlbums from "../pages/ABMAlbums";
 

export default [

    {
        path: "/",
        exact: true,
        page: Home,
        active: 1
    },
    {
        path: "/posts",
        exact: true,
        page: ABMPosts,
        active: 2
        
    },
    {
        path: "/albums",
        exact: true,
        page: ABMAlbums,
        active: 3
        
    },
    {
        path: "*",
        page: "ERROR404"
    }

];
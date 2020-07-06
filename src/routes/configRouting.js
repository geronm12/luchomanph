import Home from "../pages/Home";
import ABMPosts from "../pages/ABMPosts";
import ABMAlbums from "../pages/ABMAlbums";
 

export default [

    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "/posts",
        exact: true,
        page: ABMPosts
        
    },
    {
        path: "/albums",
        exact: true,
        page: ABMAlbums
        
    },
    {
        path: "*",
        page: "ERROR404"
    }

];
import React, {useState, useEffect} from 'react';
import BasicLayout from "../../components/Layouts/BasicLayout";
import Consulta from "../../components/Consulta/ConsultaPosts";
import {GetPosts} from "../../api/posts";

export default function ABMPosts(props) {

    const {setRefreshLogin} = props;
    
    const [posts, setPosts] = useState(null);

    const [refreshPosts, setRefreshPosts] = useState(false);

    const [page, setPage] = useState(1);

    useEffect(() => {
         
       GetPosts(page).then(response => {
        if(!response){
            setPage(1);
        }   
        
        setPosts(response)
           
       }).catch(err => {
           setPosts(null);
            
       })
    },[page, refreshPosts])



    return (
        <BasicLayout setRefreshLogin={setRefreshLogin}>
        <Consulta lista={posts} setRefreshPosts = {setRefreshPosts}  pages={page} setPage={setPage}/>
        </BasicLayout>
    )
}

import Header from '../components/header/header';
import LandList from '../components/landList/landList';
import './css/homepage.css';

import { useState, useEffect } from 'react';


export default function Homepage() {
    const [land, setLand] = useState([]);

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const id = localStorage.getItem("userId");
        console.log(id);
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/getPlotsByUserId/${id}`,{
            headers: {
                "Authorization" : `${userToken}`,
            }
        })
            .then(res => {
                return res.json();
            })
            .then((landData) => {
                if (landData.status !== 401 && landData.status !== 404){
                    setLand(landData);
                }
            })
    }, []);

    return (
        <>
            <Header></Header>
            {land && <LandList landList={land} setLand = {setLand} />}
        </>
    )
}
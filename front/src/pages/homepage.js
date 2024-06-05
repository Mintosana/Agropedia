import Header from '../components/header/header';
import LandList from '../components/landList/landList';

import { useState, useEffect } from 'react';


export default function Homepage() {
    const [land, setLand] = useState([]);
    const [userType, setUserType] = useState(localStorage.getItem("type"))
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const id = localStorage.getItem("userId");
        if (userType === "Producator") {
            fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/getPlotsByUserId/${id}`, {
                headers: {
                    "Authorization": `${userToken}`,
                }
            })
                .then(res => {
                    return res.json();
                })
                .then((landData) => {
                    if (landData.status !== 401 && landData.status !== 404) {
                        setLand(landData);
                    }
                })
        }

    }, []);

    return (
        <>
            <Header></Header>
            {userType === "Producator" && land && <LandList landList={land} setLand={setLand} />}
            {userType === "Client" && <h3>Salutare! Doresti sa cumperi ceva? acceseaza marketplace-ul</h3>}
        </>
    )
}
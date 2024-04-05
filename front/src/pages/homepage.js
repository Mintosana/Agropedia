import Header from '../components/header/header';
import LandList from '../components/landList/landList';
import './css/homepage.css';

import { useState, useEffect } from 'react';


export default function Homepage() {
    const [land, setLand] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/getAllUsers`)
            .then(res => {
                return res.json()
            })
            .then((landData) => {
                console.log(landData);
                setLand(landData);
            })
    }, []);

    return (
        <>
            <Header></Header>
            {land && <LandList landList={land}/>}
        </>
    )
}
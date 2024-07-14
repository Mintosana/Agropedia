import Header from '../components/header/header';
import LandList from '../components/landList/landList';

import { useState, useEffect } from 'react';
import StatisticsComponent from '../components/statistics/adminPage/statisticsComponent/statisticsComponent';
import TicketButton from '../components/ticketButton/ticketButton';
import TicketList from '../components/profile/adminComponents/ticketListComponent/ticketList';
import UploadDocument from '../components/companyComponents/uploadDocument/uploadDocument';
import ContractList from '../components/profile/adminComponents/contractListComponent/contractList';
import AdminContractList from "../components/companyComponents/contractList/contractList";
import CompanyStatisticsComponent from '../components/companyComponents/companyStatisticsComponent/companyStatistics';

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
            {userType === "Producator" && land &&
                <>
                    <LandList landList={land} setLand={setLand} />
                    <TicketButton></TicketButton>
                </>
            }
            {userType === "Client" &&
                <>
                    <h3>Salutare! Doresti sa cumperi ceva? acceseaza marketplace-ul</h3>
                    <UploadDocument></UploadDocument>
                    <TicketButton></TicketButton>
                </>
            }
            {userType === "Companie" &&
                <>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                        <CompanyStatisticsComponent></CompanyStatisticsComponent>
                        <AdminContractList></AdminContractList>
                    </div>

                    <TicketButton></TicketButton>
                </>
            }
            {userType === "Admin" && (
                <>
                    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                        <DashboardIcon fontSize='large'></DashboardIcon>
                        <h1>Dashboard Admin</h1>
                    </div> */}
                    <div style={{ height: '400px', display: 'flex', justifyContent: "space-evenly" }}>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <StatisticsComponent></StatisticsComponent>
                            <ContractList></ContractList>
                        </div>
                        <TicketList></TicketList>
                    </div>
                </>

            )}
        </>
    )
}
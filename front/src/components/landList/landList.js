import './landList.css'

export default function LandList({ landList, setLand }) {
    

    const handleClick = async ()=>{
        const userToken = localStorage.getItem("token");
        const landData = {
            name : "Solar rosii",
            size : 20.5,
            landType : "Solar",
            producerId : 7,
            productId : 1
        }

        const response = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/landPlot/createLand`,{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : `${userToken}`,
            },
            body: JSON.stringify(landData)
        })

        const consumedResponse = await response.json();
        console.log(consumedResponse); 

        setLand([...landList,consumedResponse]);
    }

    return (
        <div className='landList'>
            <h2>Lista Loturi de pamant</h2>
            <button onClick ={handleClick}>Adauga lot de pamant</button>
            {landList.map((land) =>
                <div className='landPreview' key={land.id}>
                    <div className='wholeContent'>
                    <h3>{land.name}</h3>
                        <div className='contentData'>
                            <p>{land.size}</p>
                            <p>{land.temperature}</p>
                            <p>{land.humidity}</p>
                            <p>{land.landType}</p>
                            <p>{land.productName}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
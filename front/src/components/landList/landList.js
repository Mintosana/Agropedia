import './landList.css'

export default function LandList({ landList }) {

    return (
        <div className='landList'>
            <h2>Lista Loturi de pamant</h2>
            {landList.map((land) =>
                <div className='landPreview' key={land.id}>
                    <div className='wholeContent'>
                    <h3>{land.name}</h3>
                        <div className='contentData'>
                            <p>{land.email}</p>
                            <p>{land.location}</p>
                            <p>{land.userType}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
import { useEffect, useState } from 'react'
import Link from 'next/link';

const Mensen = () => {
    const [mensen, setMensen] = useState([]);
    const [location, setLocation] = useState();

    const fetchApiData = async ({ latitude, longitude }) => {
        const res = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=50000`);
        const data = await res.json();
        setMensen(data);
    };

    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            })
        }
    }, []);

    useEffect(() => {
        if (location) {
            fetchApiData(location);
        }
    }, [location]);
    
    return ( 
        <div>
            <h1>Alle Mensen</h1>
            <p>Alle Mensen</p>
            {JSON.stringify(location)}
            {/*{mensen?.length > 0 && mensen.map(mensa => ( 
                <Link href={`/mensen/${mensa.id}`} key={mensa.id}>
                    <a> 
                        <h3>{mensa.name}</h3>
                    </a>
                </Link>
            ))}*/}
        </div>
    );
};
export default Mensen
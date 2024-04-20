import { useEffect, useState } from "react"

export function Users() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5100/user");
            const jsonData = await response.json();
            setData(jsonData);
          };
      
          fetchData();
    }, [])

    console.log(data)


    return <h1></h1>
}
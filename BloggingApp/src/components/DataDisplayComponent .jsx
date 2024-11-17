import React from 'react';
import { useFetchData } from './hooks/useFetchData';  

const DataDisplayComponent = () => {
    const data = useFetchData();  // This calls the hook and retrieves the data

    return (
        <div>
            <h1>Data List</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name} - {item.details}</li>  // Adjust according to your data structure
                ))}
            </ul>
        </div>
    );
};

export default DataDisplayComponent;

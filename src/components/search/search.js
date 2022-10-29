import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, GeoApiOptions } from "../../api";


const Search = ({onSearchChange}) => {

    const [search , setSearch] = useState(null);

    const loadOptions = (inputValues) => {
         return fetch(`${GEO_API_URL}/cities?minPopulation=10000000&namePrefix=${inputValues}`, GeoApiOptions)

             .then(response => response.json())
             .then(response => {
                return {
                    options :response.data.map((city) =>{
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
             })
             .catch(err => console.error(err)); 
    }

    const handleOnChange = (searchData) =>{
        setSearch(searchData);              
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
        placeholder = "Search for city"
        debounceTimeout={600}
        value = {search}
        onChange = {handleOnChange}
        loadOptions = {loadOptions}
         />
    )
}

export default Search
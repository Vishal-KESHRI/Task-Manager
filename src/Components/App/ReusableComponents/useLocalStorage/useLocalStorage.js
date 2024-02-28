import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

//remember! you must dispatch the StorageEvent everytime you update the local storage!!
function useLocalStorage(key) {
    const currentItems = JSON.parse(localStorage.getItem(key));
    const [items, setItems] = useState(currentItems ? currentItems : []);

    //this useEffect will detect changes from the local storage
    useEffect(() => {
        const UpdateStorage = () => {
            const allItems = JSON.parse(localStorage.getItem(key));
            if(allItems) 
                setItems(allItems);
        }

        document.addEventListener('UpdateStorage', UpdateStorage);

        return () => {
            document.removeEventListener('UpdateStorage', UpdateStorage);
        }
    }, [])


    return items;
}

export default useLocalStorage;
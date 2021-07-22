import React, {useEffect, useState} from "react";
import {getData} from "../api/api";
import {MainTable} from "./MainTable";

export const Content = (props) => {

    let inputRef = React.createRef()

    const setSorting = (el) => {
        let changes = new Map();
        changes[true] = false;
        changes[false] = null;
        changes[null] = true;
        setState({
            ...state,
            sorting : {
                key: changes[state.sorting.fromLeast] !== null ? el : (el === state.sorting.key ? null : el),
                fromLeast: el === state.sorting.key ? changes[state.sorting.fromLeast] : true
            }
        });
    }

    const filterCars = () => {
        setState({
            ...state,
            filterWord: inputRef.current.value
        });
    }

    const selectCar = (carName) => {
        setState({
            ...state,
            selectedCar: carName,
        });
    }

    let [state, setState] = useState({
        carsInfo: null,
        selectedCar: null,
        filterWord: null,
        sorting: {key: null, fromLeast: null}
    });

    useEffect(() => {
        getData().then(
            data => setState({...state , carsInfo: data})
        )
    }, []);

    return (
            <div className="Content">
                <div className="Input-form">
                    <input placeholder="🔍 Поиск" ref = {inputRef}/>
                    <button onClick={filterCars}>Найти</button>
                </div>
                <MainTable filterWord = {state.filterWord}
                           carsInfo = {state.carsInfo}
                           sorting = {state.sorting}
                           setSorting = {setSorting}
                           selectCar = {selectCar}
                />
                <div className="Selected-car">
                    {state.selectedCar ? "Выбран автомобиль " + state.selectedCar + " года выпуска." : "Автомобиль не выбран."}
                </div>
            </div>
    );
}
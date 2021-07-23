import React from "react";

const markModel = "Марка и модель";

const createSortingFunc = (key, fromLeast) => {
    return (a, b) => {

        if (key !== markModel) {
            if ((a.tariffs[key] === undefined) && (b.tariffs[key] === undefined)) return 0
            if ((a.tariffs[key] !== undefined) && (b.tariffs[key] === undefined)) return -1
            if ((a.tariffs[key] === undefined) && (b.tariffs[key] !== undefined)) return 1

            return (fromLeast ?
                (a.tariffs[key].year - b.tariffs[key].year) :
                (b.tariffs[key].year - a.tariffs[key].year))
        } else {
            if (a.mark + " " + a.model < b.mark + " " + b.model) return fromLeast ? -1 : 1
            if (a.mark + " " + a.model > b.mark + " " + b.model) return fromLeast ? 1 : -1
            return 0
        }
    }
}

const filter = (el, filterWord) => {
    let isFiltered = false;
    if (filterWord !== null) {
        isFiltered = (el.mark + " " + el.model).includes(filterWord);
        for (let key in el.tariffs) {
            if (!isFiltered) {
                isFiltered = String(el.tariffs[key].year).includes(filterWord);
            }
        }
    }
    return isFiltered
}

const createTableDataJsx = (cars, tariffs_list, filterWord, selectedCar, selectCar) => {
     return cars.map(
        el => {

            let isFiltered = filter(el, filterWord);

            if (isFiltered || filterWord == null) {
                let tariffs = [];
                tariffs_list.forEach(tariff => {
                    if (el.tariffs.hasOwnProperty(tariff)) {

                        let elClass = "";

                        if (selectedCar === el.mark + " " + el.model + " " + el.tariffs[tariff].year) {
                            elClass = "Selected-td";
                        } else {
                            elClass = "Clickable";
                        }

                        tariffs.push(<td className={elClass} onClick={
                            () => {selectCar(el.mark + " " + el.model + " " + el.tariffs[tariff].year)}
                        }>
                            {el.tariffs[tariff].year}
                        </td>);

                    } else {
                        tariffs.push(<td>-</td>);
                    }
                })
                return (
                    <tr>
                        <td className={"Car-name"}>{el.mark + " " + el.model}</td>
                        {tariffs}
                    </tr>
                )
            } else { return }
        }
    )
}

const createTableHeadJsx = (tariffs_list, sorting, setSorting) => {
    let newTariffsList = [...tariffs_list];
    newTariffsList.unshift(markModel);
    newTariffsList = newTariffsList.map(
        el => {
            if (sorting.key !== el) {
                return <th onClick={() => setSorting(el)}>{el}</th>
            } else {
                return <th onClick={() => setSorting(el)}>{el + " " + (sorting.fromLeast ? "↓" : "↑") }</th>
            }
        }
    )
    return newTariffsList;
}

export const MainTable = ({filterWord, carsInfo, sorting, selectedCar, selectCar, setSorting}) => {

    let tariffs_list = [];
    let cars = [];

    if (carsInfo !== null) {

        tariffs_list = [...carsInfo.tariffs_list];
        cars = [...carsInfo.cars];

        if (sorting.key !== null) {
            cars.sort(createSortingFunc(sorting.key, sorting.fromLeast));
        }

        cars = createTableDataJsx(cars, carsInfo.tariffs_list, filterWord, selectedCar, selectCar);

        tariffs_list = createTableHeadJsx(tariffs_list, sorting, setSorting);

        //Удаление шапки таблицы, если нет элементов
        if (cars.reduce((acc, el) => {
            if (el !== undefined) {acc = false}
            return acc;
        } , true)) {
            tariffs_list = [];
        }

    }


    return (
        <div className="Main-table">
            <div className="Table-head">
                <table>
                    <tr>
                        {tariffs_list.length !== 0 ? tariffs_list : <div className="No-cars-label">Машин не найдено</div>}
                    </tr>
                </table>
            </div>
            <div className="Scrolling-part">
                <table>
                    {cars}
                </table>
            </div>
        </div>
    )
}
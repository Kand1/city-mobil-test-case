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

export const MainTable = ({filterWord, carsInfo, sorting, selectCar, setSorting}) => {

    let tariffs_list = [];
    let cars = [];

    if (carsInfo !== null) {

        tariffs_list = [...carsInfo.tariffs_list];
        cars = [...carsInfo.cars];

        //Сортировка данных
        if (sorting.key !== null) {
            cars.sort(createSortingFunc(sorting.key, sorting.fromLeast));
        }

        //jsx тела таблицы
        cars = cars.map(
            el => {
                //Фильтрация элемента
                let isFiltered = false;
                if (filterWord !== null) {
                    isFiltered = (el.mark + " " + el.model).includes(filterWord);
                    for (let key in el.tariffs) {
                        if (!isFiltered) {
                            isFiltered = String(el.tariffs[key].year).includes(filterWord);
                        }
                    }
                }
                //Строка таблицы
                if (isFiltered || filterWord == null) {
                    let tariffs = [];
                    carsInfo.tariffs_list.forEach(tariff => {
                        if (el.tariffs.hasOwnProperty(tariff)) {
                            tariffs.push(<td className="Clickable" onClick={
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

        //jsx шапки таблицы
        tariffs_list.unshift(markModel);
        tariffs_list = tariffs_list.map(
            el => {
                if (sorting.key !== el) {
                    return <th onClick={() => setSorting(el)}>{el}</th>
                } else {
                    return <th onClick={() => setSorting(el)}>{el + " " + (sorting.fromLeast ? "↓" : "↑") }</th>
                }
            }
        )

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
import PieChartComponent from "../graphs/productsQuantityDonut";
import SimpleDataComponent from "../simpleDataComponent/simpleDataComponent";

import './statisticsComponent.css'

export default function StatisticsComponent(){
    return(
        <div className="mainStatisticsContainer">
        <PieChartComponent></PieChartComponent>
        <SimpleDataComponent></SimpleDataComponent>
        </div>
    )
}
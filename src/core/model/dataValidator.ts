export class DataValidator {

    public validateChartData(chartData: any){
        if (chartData && Array.isArray(chartData)) {
            if (chartData.length > 0) {
                return chartData.every((element: any) => typeof element === 'string');
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
   
}
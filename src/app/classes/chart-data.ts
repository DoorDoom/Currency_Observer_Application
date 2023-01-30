export interface ChartData {
    labelArray: string[];
    data: DataToChart[];
    id: number;
    fromCurrency: string;
    toCurrency: string;
}

export interface DataToChart {
    label: string;
    backgroundColor: string;
    data: string[];
}


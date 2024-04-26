import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const AreaChartPlot = () => {
    const data = [
        {
            year: "2016",
            Wheater: 4000,
            Humidity: 2400
        },
        {
            year: "2017",
            Wheater: 3000,
            Humidity: 1398
        },
        {
            year: "2018",
            Wheater: 2000,
            Humidity: 9800
        },
        {
            year: "2019",
            Wheater: 2780,
            Humidity: 3908
        },
        {
            year: "2020",
            Wheater: 1890,
            Humidity: 4800
        },
        {
            year: "2021",
            Wheater: 2390,
            Humidity: 3800
        },
        {
            year: "2022",
            Wheater: 3490,
            Humidity: 4300
        }
    ];
    return (
        <>
            <ResponsiveContainer className='w-full h-full'>
                <AreaChart
                    width={730}
                    fontSize={10}
                    height={250}
                    data={data}
                    margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id='colorUv'
                            x1='0'
                            y1='0'
                            x2='0'
                            y2='1'
                        >
                            <stop
                                offset='5%'
                                stopColor='#8884d8'
                                stopOpacity={0.8}
                            />
                            <stop
                                offset='95%'
                                stopColor='#8884d8'
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient
                            id='colorPv'
                            x1='0'
                            y1='0'
                            x2='0'
                            y2='1'
                        >
                            <stop
                                offset='5%'
                                stopColor='#82ca9d'
                                stopOpacity={0.8}
                            />
                            <stop
                                offset='95%'
                                stopColor='#82ca9d'
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey='year' />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type='monotone'
                        dataKey='Wheater'
                        stroke='#8884d8'
                        fillOpacity={1}
                        fill='url(#colorUv)'
                    />
                    <Area
                        type='monotone'
                        dataKey='Humidity'
                        stroke='#82ca9d'
                        fillOpacity={1}
                        fill='url(#colorPv)'
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
};
export default AreaChartPlot;

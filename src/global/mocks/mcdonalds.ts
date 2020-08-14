interface DataMcdonaldsProps {
    code: number;
    latitude: number;
    longitude: number;
    address: string;
    title: string;
    house: string;
    country: string;
    city: string;
    province?: string;
}

export const mockDataMcdonalds: DataMcdonaldsProps[] = [
    {
        code: 1,
        longitude: 49.084756,
        latitude: 55.84775,
        title: 'mcdonalds 1',
        address: 'улица Дементьева',
        house: '1В',
        country: 'Россия',
        city: 'Казань',
        province: 'Республика Татарстан'
    },
    {
        code: 2,
        longitude: 49.09541,
        latitude: 55.818306,
        address: 'улица Мулланура Вахитова',
        house: '1',
        title: 'mcdonalds 2',
        country: 'Россия',
        city: 'Казань',
        province: 'Республика Татарстан'
    },
    {
        code: 3,
        longitude: 49.13454,
        latitude: 55.825487,
        title: 'mcdonalds 3',
        address: 'улица проспект Ямашева',
        house: '69Б',
        country: 'Россия',
        city: 'Казань',
        province: 'Республика Татарстан'
    },
    {
        code: 4,
        longitude: 49.099102,
        latitude: 55.791946,
        title: 'mcdonalds 4',
        address: 'улица Саид-Галеева',
        house: '4',
        country: 'Россия',
        city: 'Казань',
        province: 'Республика Татарстан'
    },
    {
        code: 5,
        longitude: 49.152974,
        latitude: 55.826918,
        title: 'mcdonalds 5',
        address: 'улица Ямашева проспект',
        house: '98Б',
        country: 'Россия',
        city: 'Казань',
        province: 'Республика Татарстан'
    },
    {
        code: 6,
        longitude: 37.582053,
        latitude: 55.804349,
        title: 'mcdonalds 6',
        address: 'улица Бутырская',
        house: '77с2',
        country: 'Россия',
        city: 'Москва',
        province: ''
    },
    {
        code: 7,
        longitude: 37.706586,
        latitude: 55.78197,
        title: 'mcdonalds 7',
        address: 'улица Большая Семёновская',
        house: '26',
        country: 'Россия',
        city: 'Москва',
        province: ''
    },
    {
        code: 8,
        longitude: 37.462317,
        latitude: 55.808923,
        title: 'mcdonalds 8',
        address: 'улица Маршала Василевского',
        house: '17',
        country: 'Россия',
        city: 'Москва',
        province: ''
    },
    {
        code: 9,
        longitude: 37.676178,
        latitude: 55.85153,
        title: 'mcdonalds 9',
        address: 'улица Ярославское шоссе',
        house: 'вл3с1',
        country: 'Россия',
        city: 'Москва',
        province: ''
    },
    {
        code: 10,
        longitude: 37.585404,
        latitude: 55.862979,
        title: 'mcdonalds 10',
        address: 'улица Алтуфьевское шоссе',
        house: '24к1',
        country: 'Россия',
        city: 'Москва',
        province: ''
    },
];
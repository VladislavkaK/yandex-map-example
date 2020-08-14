import React from 'react';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { BlockProps } from 'baseui/block'
import { isEmpty } from 'lodash';
import { Button, KIND } from 'baseui/button'
import Search from '../../components/IndexPage/Search';
import Map from '../../components/IndexPage/Map';
import { mockDataMcdonalds } from '../../global/mocks/mcdonalds';

const itemSearchProps: BlockProps = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%'
};

const itemContenttProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '700px',
    height: '600px'
};

const itemSearchBackProps: BlockProps = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%'
};

const MOSCOW_COORD = [55.75396, 37.620393];

const MapPage = ({ location }: RouteComponentProps) => {
    const { state }: any = location;
    const [currentAddressMcdonalds, setCurrentAddressMcdonalds] = React.useState<{
        code?: number;
        address?: string;
    }>(isEmpty(state) ? {} : state.currentAddressMcdonalds);
    const [data, setData] = React.useState(mockDataMcdonalds);
    const [val, setVal] = React.useState<string>('');

    const history = useHistory();

    const handleBackClick = () => {
        history.push({
            pathname: '/',
            state: {
                currentAddressMcdonalds
            }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLocaleLowerCase();
        const searchData: any = [];

        setVal(value);

        mockDataMcdonalds.map((item) => {
            if (item.address.toLocaleLowerCase().includes(value)) searchData.push(item);
        });

        setData(searchData);
    }

    return (
        <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            backgroundColor="#EDF0F2"
            height="100vh"
        >
            <FlexGridItem {...itemSearchProps}>
                <Search value={val} onChange={handleChange} />
            </FlexGridItem>
            <FlexGridItem {...itemContenttProps}>
                <Map 
                    currentAddressMcdonalds={currentAddressMcdonalds}
                    setCurrentAddressMcdonalds={setCurrentAddressMcdonalds}
                    data={data}
                    params={{
                        center: MOSCOW_COORD,
                        zoom: 7,
                        controls: ['zoomControl']
                    }}
                />
            </FlexGridItem>
            {currentAddressMcdonalds.code && (
                <FlexGridItem {...itemSearchBackProps}>
                    <Button onClick={handleBackClick} kind={KIND.secondary}>Go back to main page</Button>
                </FlexGridItem>
            )}
        </FlexGrid>
    );
}

export default MapPage;

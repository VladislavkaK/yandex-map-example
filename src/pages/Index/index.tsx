import React from 'react';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { BlockProps } from 'baseui/block';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Button, KIND } from "baseui/button";
import { isEmpty } from 'lodash';

const itemTextProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
};

const itemSelectProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
};

const IndexPage = ({ location }: RouteComponentProps) => {
    const history = useHistory();
    const { state }: any = location;

    const handleClick = () => {
        history.push({
            pathname: '/map',
            state: {
                currentAddressMcdonalds: isEmpty(state) ? {} : state.currentAddressMcdonalds
            }
        });
    }

    return (
        <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            backgroundColor="#EDF0F2"
            height="100vh"
        >
            {isEmpty(state) ? (
                <>
                    <FlexGridItem {...itemTextProps}>
                        Select Mcdonalds address
                    </FlexGridItem>
                    <FlexGridItem {...itemSelectProps}>
                        <Button onClick={handleClick} kind={KIND.secondary}>Select Address</Button>
                    </FlexGridItem>
                </>
            ) : (
                <>
                    <FlexGridItem {...itemTextProps}>
                        {`Selected address mcdonalds: ${state.currentAddressMcdonalds.address}`}
                    </FlexGridItem>
                    <FlexGridItem {...itemSelectProps}>
                        <Button onClick={handleClick} kind={KIND.secondary}>Change Address</Button>
                    </FlexGridItem>
                </>
            )}
        </FlexGrid>
    );
}

export default IndexPage;

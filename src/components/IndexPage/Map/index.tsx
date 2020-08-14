import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import { YMaps, Map as YMap, YMapsApi, Clusterer, Placemark } from 'react-yandex-maps';
import { isEmpty } from 'lodash';
import { Spinner } from "baseui/spinner";
import IconMarker from '../../../global/icons/marker';

const classNames = {
    balloon: 'ymaps-2-1-75-balloon',
    balloonContent: 'ymaps-2-1-75-balloon__content',
    ballonLayout: 'ymaps-2-1-75-balloon__layout',
    balloonClose: 'ymaps-2-1-75-balloon__close',
    balloonCloseButton: 'ymaps-2-1-75-balloon__close-button',
};

const WrapperYandexMap = styled.div.attrs(classNames)`
    .${classNames.balloon} {
        border-radius: 10px;
    }
    .${classNames.ballonLayout} {
        border-radius: 10px;
    }
    .${classNames.balloonContent} {
        margin-top: 10px;
        margin-left: 20px;
    }
    .${classNames.balloonCloseButton} {
        display: block;
        width: 30px;
        height: 40px;
        cursor: pointer;
        opacity: 1;
        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS41NDU0IDguOTk5MzVMMTcuMjA3NyAzLjA1MzkxQzE3LjM3NDQgMi44ODYzIDE3LjM3NDQgMi42MzQ5NSAxNy4yMDc3IDIuNDY3NDFMMTUuNTQxNCAwLjc5MTY3MUMxNS4zNzQ3IDAuNjI0MTMgMTUuMTI0OCAwLjYyNDEzIDE0Ljk1ODIgMC43OTE2NzFMOC45NjU4OSA2LjQ4OTEzTDMuMDUzNjIgMC43OTUwMzFDMi44ODY5NSAwLjYyNzQ5MSAyLjYzNzA5IDAuNjI3NDkxIDIuNDcwNDIgMC43OTUwMzFMMC44MDQwODcgMi40NzA3N0MwLjYzNzQyIDIuNjM4MzEgMC42Mzc0MiAyLjg4OTY2IDAuNzIwNzUzIDMuMDU3MjdMNi40NjYzNSA4Ljk5OTM1TDAuODA3NDIgMTQuOTQ0OEMwLjY0MDc1MyAxNS4xMTI0IDAuNjQwNzUzIDE1LjM2MzcgMC44MDc0MiAxNS41MzEzTDIuNDczNzUgMTcuMjA3QzIuNjQwNDIgMTcuMzc0NiAyLjg5MDM1IDE3LjM3NDYgMy4wNTY5NSAxNy4yMDdMOC45NjU4OSAxMS41MDk2TDE0Ljg3ODIgMTcuMjAzN0MxNS4wNDQ4IDE3LjM3MTIgMTUuMjk0OCAxNy4zNzEyIDE1LjQ2MTQgMTcuMjAzN0wxNy4xMjc4IDE1LjUyNzlDMTcuMjk0NCAxNS4zNjA0IDE3LjI5NDQgMTUuMTA5IDE3LjEyNzggMTQuOTQxNEwxMS41NDU0IDguOTk5MzVIMTEuNTQ1NFoiIGZpbGw9IiMwMDk5REEiLz4KPC9zdmc+Cg==')
            50% no-repeat;
    }
`;

const StyledCustomBalloonContainer = styled.div``;

const StyledCustomBalloonTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 24px;
        font-weight: bold;
    }
`;

const StyledCustomBalloonBodyContainer = styled.div`
    margin-top: 10px;
`;

const StyledCustomBalloonBodyTypes = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const StyledCustomBalloonBodyTypesIcon = styled.div``;

const StyledCustomBalloonBodyTypesContent = styled.div`
    margin-left: 10px;
`;

const StyledCustomBalloonFooterContainer = styled.div`
    width: 275px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledButton = styled.button`
    width: 100%;
    color: #fff;
    background: black;
    padding: 10px;
`;

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

interface MapProps {
    data: DataMcdonaldsProps[];
    params: {
        center: number[];
        zoom: number;
        controls: string[];
    };
    currentAddressMcdonalds: {
        code?: number;
        address?: string;
    };
    setCurrentAddressMcdonalds: ({ code, address }: {
        code?: number;
        address?: string;
    }) => void;
}

const CustomBalloon: React.FC<{
    item: DataMcdonaldsProps;
    currentAddressMcdonalds: {
        code?: number;
        address?: string;
    };
}> = ({ item, currentAddressMcdonalds }) => {
    return (
        <StyledCustomBalloonContainer>
            {/** Only your markup, other custom markup didn't work */}
            <StyledCustomBalloonTitleContainer>
                <h2>{item.title}</h2>
            </StyledCustomBalloonTitleContainer>
            <StyledCustomBalloonBodyContainer>
                <StyledCustomBalloonBodyTypes>
                    <StyledCustomBalloonBodyTypesIcon>
                        <IconMarker />
                    </StyledCustomBalloonBodyTypesIcon>
                    <StyledCustomBalloonBodyTypesContent>
                        {`г.${item.city}, ${item.address} ${item.house}`}
                    </StyledCustomBalloonBodyTypesContent>
                </StyledCustomBalloonBodyTypes>
            </StyledCustomBalloonBodyContainer>
            <StyledCustomBalloonFooterContainer id="set_dealer">
                <StyledButton type="button">
                    {item.code === currentAddressMcdonalds.code
                        ? 'Selected'
                        : 'Select'}
                </StyledButton>
            </StyledCustomBalloonFooterContainer>
        </StyledCustomBalloonContainer>
    );
};

const defaultPlacemark = {
    size: [44, 54],
    offset: [-22, -39],
    href:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxwYXRoIGQ9Ik0zNiAxNy42NzNDMzYgMjUuMzA4IDIyIDQyIDIyIDQyUzggMjUuMzA4IDggMTcuNjczQzggMTAuMDM3IDE0LjE4MiA0IDIyIDRjNy42MzYgMCAxNCA2LjAzNyAxNCAxMy42NzN6IiBmaWxsPSJibGFjayIvPjxjaXJjbGUgY3g9IjIyIiBjeT0iMTgiIHI9IjUiIGZpbGw9IiNmZmYiLz48L2c+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSItMSIgd2lkdGg9IjQ0LjQwOCIgaGVpZ2h0PSI1NS41NyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+PGZlT2Zmc2V0IGR5PSI0Ii8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjI5NDExOCAwIDAgMCAwIDAuNjU4ODI0IDAgMCAwIDAgMC4xODAzOTIgMCAwIDAgMC4zIDAiLz48ZmVCbGVuZCBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48L2RlZnM+PC9zdmc+',
};

const selectedDealerMark = {
    size: [45, 45],
    offset: [-22, -22],
    href:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2QpIiBzdHJva2U9ImJsYWNrIj4KPHBhdGggZD0iTTM1LjM2MyAxNy44MDVjMCA2LjkzOC00Ljk2OCAxMi43NTgtMTIuNSAxMi43NTgtNy41MzEgMC0xMi41LTUuODItMTIuNS0xMi43NTggMC02LjgyIDUuNDg0LTEyLjI0MiAxMi41LTEyLjI0MiA2Ljg0NyAwIDEyLjUgNS40MzUgMTIuNSAxMi4yNDJ6IiBmaWxsPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KPGNpcmNsZSBjeD0iMjIuODYzIiBjeT0iMTguMDYzIiByPSI0LjUiIGZpbGw9ImJsYWNrIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iLjg2MyIgeT0iLjA2MyIgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0Ii8+CjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjI5NDExOCAwIDAgMCAwIDAuNjU4ODI0IDAgMCAwIDAgMC4xODAzOTIgMCAwIDAgMC4zIDAiLz4KPGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj48L2RlZnM+PC9zdmc+',
};

const defaultPlacemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref: defaultPlacemark.href,
    iconImageSize: defaultPlacemark.size,
    iconImageOffset: defaultPlacemark.offset,
};

const selectedDealerPlacemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref: selectedDealerMark.href,
    iconImageSize: selectedDealerMark.size,
    iconImageOffset: selectedDealerMark.offset,
};

const Map: React.FC<MapProps> = ({ 
    params, 
    data, 
    currentAddressMcdonalds,
    setCurrentAddressMcdonalds 
}) => {
    const myMap: any = React.useRef(null);
    const refCluster: any = React.useRef(null);
   
    const [dataMap, setDataMap] = React.useState<YMapsApi>({});

    const handleSetYmaps = (ymaps: YMapsApi) => {
        setDataMap(ymaps);
    };

    const handleRefPlacemark = (ref: YMapsApi) => {
        ref.events
            .add('click', function(e: any) {
                myMap.current.setCenter(e.get('target').geometry.getCoordinates()); // центрирование placemark
                myMap.current.setZoom(16);
            });
    };

    const handleSetPropertiesPlacemark = (item: DataMcdonaldsProps) => {
        const hint = 
            item.code === currentAddressMcdonalds.code ? `My mcdonalds: ${currentAddressMcdonalds.address}` : '';

        return {
            hintContent: hint,
        };
    };

    const handleSetOptionsPlacemark = (item: DataMcdonaldsProps) => {
        let MyBalloonContentLayoutClass: any;

        const customPopover = <CustomBalloon item={item} currentAddressMcdonalds={currentAddressMcdonalds} />;

        if (!isEmpty(dataMap)) {
            const html = ReactDOMServer.renderToString(customPopover);

            const templ = `
                <div id="custom_layout">${html}</div>`;

            MyBalloonContentLayoutClass = dataMap.templateLayoutFactory.createClass(templ, {
                build: function() {
                    MyBalloonContentLayoutClass.superclass.build.call(this);

                    ReactDOM.hydrate(customPopover, document.getElementById('custom_layout'));

                    const elemButton: any = document.getElementById('set_dealer');

                    elemButton.addEventListener('click', this.setFavoriteDealer);
                },

                setFavoriteDealer: function() {
                    setCurrentAddressMcdonalds({
                        code: item.code,
                        address: `${item.address}, ${item.house}`
                    });
                    myMap.current.balloon.close();
                    myMap.current.setZoom(10);
                },

                clear: function() {
                    MyBalloonContentLayoutClass.superclass.clear.call(this);
                },
            });
        }

        const options =
            item.code === currentAddressMcdonalds.code
                ? selectedDealerPlacemarkOptions
                : defaultPlacemarkOptions;

        return {
            balloonContentLayout: MyBalloonContentLayoutClass,
            ...options,
        };
    };

    const renderPlacemarks = () => {
        return data.map((item) => {
            return (
                <Placemark
                    instanceRef={(ref: YMapsApi) =>
                        ref && handleRefPlacemark(ref)
                    }
                    key={item.code}
                    geometry={[item.latitude, item.longitude]}
                    properties={handleSetPropertiesPlacemark(item)}
                    options={handleSetOptionsPlacemark(item)}
                    modules={[
                        'geoObject.addon.balloon',
                        'geoObject.addon.hint',
                    ]}
                />
            );
        })
    }

    return (
        <WrapperYandexMap>
            <YMaps
                query={{
                    load: 'package.full', // load props for state
                }}
            >
                <div id="map">
                    <YMap 
                        instanceRef={myMap} // props current map
                        onLoad={(ymaps) => {
                            handleSetYmaps(ymaps); // get props object Map
                        }}
                        width={'700px'}
                        height={'600px'}
                        defaultState={{ center: params.center, zoom: params.zoom, controls: params.controls }} 
                        modules={['geolocation', 'geocode', 'templateLayoutFactory']} 
                    >
                        <Clusterer
                            instanceRef={refCluster}
                            options={{
                                preset: 'islands#invertedBlackClusterIcons',
                                groupByCoordinates: false,
                            }}
                        >
                            {renderPlacemarks()}
                        </Clusterer>
                    </YMap>
                    {isEmpty(dataMap) && <Spinner />}
                </div>
            </YMaps>
        </WrapperYandexMap>
    );
}

export default Map;
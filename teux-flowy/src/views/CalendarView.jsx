import styled from "styled-components";
import { CalendarCard } from "../Components/CalendarCard/CalendarCard";
import { getDay, format, previousDay, addDays } from "date-fns";
import { useState } from "react";
import { toUpper } from "lodash";

const StyledCarouselContainer = styled.div`
    overflow: hidden;
    position: relative;
    height: 60vh;
`;

const StyledLeftArrow = styled.button`
    poistion: absolute;
    z-index: 5;
`;

const StyledRightArrow = styled(StyledLeftArrow)``;

const StyledCardsWrapper = styled.div`
    display: flex;
    position: absolute;
    left: ${(props) => {
        return props.position + "vw"
    }};
    flex-wrap: nowrap;
    height: 100%;
`;

// arrows left and right - position sticky left and right
//

const CalendarView = () => {
    const [carouselState, setCarouselState] = useState({
        currentPosition: 1,
        leftEndPosition: -5,
    });

    // console.log(addDays(Date.now(), -10));
    // console.log(format(addDays(Date.now(), -10), "eeee"));
    // console.log(format(addDays(Date.now(), -10), "MMMM do yyyy"));

    const allDates = Array.from({ length: 21 }, (_, i) => addDays(Date.now(), -10 + i));
    console.log(allDates.map((date) => format(date, "MMMM do yyyy")));

    const changeCarouselPosition = (delta) => {
        console.log("state", carouselState);

        setCarouselState({
            ...carouselState,
            currentPosition: carouselState.currentPosition + delta,
        });
    };

    const position = (carouselState.currentPosition - carouselState.leftEndPosition) * (-20);

    console.log(allDates[0]);
    return (
        // ogólny wrapper, w którym beda tez strzalki: position: relative
        // strzałki
        <StyledCarouselContainer>
            <StyledLeftArrow onClick={() => changeCarouselPosition(-1)}>lewo</StyledLeftArrow>
            <StyledRightArrow onClick={() => changeCarouselPosition(1)}>prawo</StyledRightArrow>
            <StyledCardsWrapper position={position}>
                {allDates.map((date) => (
                    <>
                        <CalendarCard
                            mainHeading={toUpper(format(date, "eeee"))}
                            headingContent={toUpper(format(date, "MMMM do yyyy"))}
                        />
                    </>
                ))}
            </StyledCardsWrapper>
        </StyledCarouselContainer>
    );
};

export { CalendarView };

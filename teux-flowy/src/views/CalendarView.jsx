import styled from "styled-components";
import { CalendarCard } from "../Components/CalendarCard/CalendarCard";
import { getDay, format, previousDay, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/fontawesome-free-solid";

const StyledCarouselContainer = styled.div`
    overflow: hidden;
    position: relative;
    height: 60vh;
`;

const StyledArrow = styled.button`
    --margin: 2rem;
    position: absolute;
    top: 45%;
    z-index: 5;
    background: transparent;
    border: none;
    opacity: 0.6;
    cursor: pointer;
    &:hover{
        opacity: 0.9;
    }
`;

const StyledLeftArrow = styled(StyledArrow)`
    left: var(--margin);
`;

const StyledRightArrow = styled(StyledArrow)`
    right: var(--margin);
`;

const StyledCardsWrapper = styled.div`
    display: flex;
    position: absolute;
    --translation: ${(props) => {
        return props.position + "vw";
    }};
    left: var(--translation);
    flex-wrap: nowrap;
    height: 100%;
`;

// arrows left and right - position sticky left and right
//

const CalendarView = () => {
    const [carouselState, setCarouselState] = useState({
        currentPosition: -1,
        leftEndPosition: -10,
        dates: Array.from({ length: 21 }, (_, i) => addDays(Date.now(), -10 + i)),
    });

    const [scrollAnimationLeft, setScrollAnimationLeft] = useState(true);
    const [scrollAnimationRight, setScrollAnimationRight] = useState(true);

    // console.log(addDays(Date.now(), -10));
    // console.log(format(addDays(Date.now(), -10), "eeee"));
    // console.log(format(addDays(Date.now(), -10), "MMMM do yyyy"));

    const changeCarouselPosition = (delta) => {
        if(delta > 0) {
            setScrollAnimationLeft(false);

            setTimeout(() => {
                setCarouselState({
                    ...carouselState,
                    currentPosition: carouselState.currentPosition + delta,
                });
                setScrollAnimationLeft(true);
            }, 300);
        } else {
            setScrollAnimationRight(false);

            setTimeout(() => {
                setCarouselState({
                    ...carouselState,
                    currentPosition: carouselState.currentPosition + delta,
                });
                setScrollAnimationRight(true);
            }, 300);
        }
    };

    useEffect(() => {
        setScrollAnimationLeft(true);
    }, []);

    const position = (carouselState.currentPosition - carouselState.leftEndPosition) * -20;
    console.log(position);

    return (
        // ogólny wrapper, w którym beda tez strzalki: position: relative
        // strzałki

        <StyledCarouselContainer>
            <StyledLeftArrow onClick={() => changeCarouselPosition(-1)}>
                <FontAwesomeIcon icon={faChevronCircleLeft} size="8x" />
            </StyledLeftArrow>
            <StyledRightArrow onClick={() => changeCarouselPosition(1)}>
                <FontAwesomeIcon icon={faChevronCircleRight} size="8x" />
            </StyledRightArrow>
            <CSSTransition
                in={scrollAnimationLeft}
                timeout={300}
                classNames={"scrollLeft"}
                unmountOnExit
            >
                <CSSTransition
                in={scrollAnimationRight}
                timeout={300}
                classNames={"scrollRight"}
                unmountOnExit
            >
                <StyledCardsWrapper position={position}>
                    {carouselState.dates.map((date) => (
                        <>
                            <CalendarCard date={date} />
                        </>
                    ))}
                </StyledCardsWrapper>
            </CSSTransition>
            </CSSTransition>
        </StyledCarouselContainer>
    );
};

export { CalendarView };

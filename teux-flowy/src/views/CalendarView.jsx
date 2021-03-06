import { CalendarCard } from "../Components/CalendarCard/CalendarCard";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight} from "@fortawesome/fontawesome-free-solid";
import { PALLETE } from "../Colors/colors";
import { CalendarNav } from "../Components/CalendarNav/CalendarNav";
import { Navigate } from "react-router-dom";

// Config values

const baseOffset = 3;
const totalSize = 5 + baseOffset * 2;

const CalendarView = ({ userInfo }) => {
    const [activeDay, setActiveDay] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [targetOffset, setTargetOffset] = useState(0);
    const [days, setDays] = useState([]);
    const [slidingSize, setSlidingSize] = useState(window.visualViewport.width < 900 ? 1 : 5)


    const containerRef = useRef(null);
    const currentOffset = useRef(0);

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            window.visualViewport.width < 900 ? setSlidingSize(1) : setSlidingSize(5);
        });

        let id;
        const updateIncrementallyCarouselPositionAfterAnimationStart = () => {
            const currentCardsContainer = containerRef.current;

            currentOffset.current =
                currentOffset.current > targetOffset
                    ? Math.max(currentOffset.current - 0.06, targetOffset)
                    : Math.min(currentOffset.current + 0.06, targetOffset);

            if (currentCardsContainer) {
                currentCardsContainer.style.setProperty("--offset", currentOffset.current);
            }

            if (currentOffset.current === targetOffset) {
                setActiveDay((prevState) => addDays(prevState, targetOffset));
                setTargetOffset(0);
                currentOffset.current = 0;
                currentCardsContainer.style.setProperty("--offset", currentOffset.current);

                return;
            }
            id = requestAnimationFrame(updateIncrementallyCarouselPositionAfterAnimationStart);
        };

        updateIncrementallyCarouselPositionAfterAnimationStart();

        return () => {
            cancelAnimationFrame(id);
        };
    }, [targetOffset]);

    const carouselForward = () => {
        setTargetOffset((prevState) => prevState + 1);
    };

    const carouselBackward = () => {
        setTargetOffset((prevState) => prevState - 1);
    };

    useEffect(() => {
        const days = Array.from({ length: totalSize }, (_, i) => {
            return addDays(activeDay, i - 4);
        });
        setDays(days);
    }, [activeDay]);

    return (
        <CalendarViewWrapper>
            {!userInfo.isLogged && <Navigate to="/" />}
            <CalendarNav
                setActiveDay={setActiveDay}
                activeDay={activeDay}
                slidingSize={slidingSize}
            />
            <CalendarCarouselWrapper>
                <CalendarSideContainer>
                    <StyledLeftArrow onClick={carouselBackward}>
                        <FontAwesomeIcon icon={faChevronLeft} size="3x" />
                    </StyledLeftArrow>
                </CalendarSideContainer>

                <DaysViewport slidingSize={slidingSize} ref={containerRef}>
                    <DaysContainer>
                        {days?.map((day) => {
                            return (
                                <DayContainer
                                    daysDiff={differenceInCalendarDays(Date.now(), activeDay)}
                                    key={day.getTime()}
                                >
                                    <CalendarCard
                                        homeId={userInfo.currentHomeId}
                                        date={day}
                                        key={`${day.toString()}card`}
                                    />
                                </DayContainer>
                            );
                        })}
                    </DaysContainer>
                </DaysViewport>

                <CalendarSideContainer>
                    <StyledRightArrow onClick={carouselForward}>
                        <FontAwesomeIcon icon={faChevronRight} size="3x" />
                    </StyledRightArrow>
                </CalendarSideContainer>
            </CalendarCarouselWrapper>
        </CalendarViewWrapper>
    );
};

export { CalendarView };

const CalendarViewWrapper = styled.div`
    transition: opacity 1s;
`;

const CalendarCarouselWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 9fr 0.3fr;
    margin-top: 2rem;
`;

const CalendarSideContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DaysViewport = styled.div`
    --baseOffset: ${baseOffset};
    --offset: 0;
    --totalOffset: calc(var(--offset) + var(--baseOffset));
    --totalSize: ${totalSize};
    --slidingWindowSize: ${(props) => props.slidingSize};
    box-sizing: border-box;
    width: 100%;
    border: none;
    margin: 5rem auto;
    overflow: hidden;
    border: 1px ${PALLETE.greyST} solid;
    border-top: none;
    border-bottom: none;
`;

const DaysContainer = styled.section`
    box-sizing: border-box;
    height: 100%;
    display: flex;
    transform: translateX(calc(-1 * 100% * var(--totalOffset) / var(--totalSize)));
    width: calc(100% * var(--totalSize) / var(--slidingWindowSize));
`;

const DayContainer = styled.section`
    flex-basis: calc(100% / var(--slidingWindowSize));
    position: relative;
    box-sizing: border-box;
    border-radius: 0.8rem;
    &:nth-child(${(props) => (props.daysDiff % 2 ? "2n" : "2n+1")}) {
        background: ${PALLETE.lightST};
    }
`;

const StyledArrow = styled.button`
    border: none;
    opacity: 1;
    cursor: pointer;
    width: 100%;
    height: 100%;
    color: ${PALLETE.primary};
    background: transparent;
    transition: background-color 0.4s;
    &:hover {
        opacity: 0.8;
        background-color: ${PALLETE.secondaryST};
    }
`;

const StyledLeftArrow = styled(StyledArrow)`
    border-radius: 0 1rem 1rem 0;
`;

const StyledRightArrow = styled(StyledArrow)`
    border-radius: 1rem 0 0 1rem;
`;

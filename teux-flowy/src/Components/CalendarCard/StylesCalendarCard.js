import styled from "styled-components";

export const CardWrapper = styled.div`
    display: flex;
    width: 20vw;
    flex-direction: column;
    margin-top: 5rem;
    border-right: .05rem solid #DCDCDC;
    flex-shrink: 0;
`;

export const CardHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items:center;
    height: 100px;
    padding: 1rem;
`;

export const MainHeadingDay = styled.h2`
    font-size: 2.2rem;
    font-weight: bold;
`;

export const HeadingFullDate = styled.p`
    font-size: 1.2rem;
    margin-top: 1.5rem;
`

export const CardNotesArea = styled.div`
    padding: 1rem;
    height: 100%;
`;



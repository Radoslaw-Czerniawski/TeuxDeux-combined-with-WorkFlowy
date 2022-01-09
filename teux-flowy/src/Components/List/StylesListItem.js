import styled from "styled-components";

export const ListElement = styled.li`
    font-size: 1.6rem;
    margin-left: 2rem;
    padding-left: ${(props) => props.isFirst ? "2rem" : "1rem"};
    padding-top: ${(props) => props.isFirst ? "1.3rem" : "0"};
`;
export const ListElementButtonContainer = styled.div`
    display: flex;
    align-items: start;
`
export const ListElementDateAndTitleContainer = styled.div`
    display: flex;
    margin-top: 1.5rem;
    flex-direction: column;
`
export const DotButton = styled.div`
    display: flex;
    margin: 0 1.2rem 0 0.8rem;
    width: .8rem;
    height: .8rem;
    background: black;
    border-radius: 1rem;
    opacity: .7;
    cursor: pointer;
    position: relative;
    &:hover {
        &:after {
            content: "";
            position: absolute;
            display: block;
            width: 2rem;
            height: 2rem;
            border-radius: 100%;
            left: -.6rem;
            top: -.6rem;
            opacity: .2;
            background: black;
        }
    }
`;
export const InlineContextButton = styled.div`
    visibility: hidden;
    display: flex;
    width: 0.8rem;
    height: .8rem;
    margin: 0 1rem;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    ${(props) => props.isFirst ? "margin-right: 2rem;" : null}
    ${(props) => props.isInlineContextVisibile ? "visibility: visible; background: #ddd;" : null}
    cursor: pointer;
    &:hover {
        &:after {
            content: "";
            position: absolute;
            display: block;
            width: 2rem;
            height: 2rem;
            border-radius: 100%;
            opacity: .2;
            background: black;
        }
    }
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;

export const ListElementHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: ${(props) => props.isFirst ? ".2rem" : "0"};
    transition: background-color 0.3s linear;

    &:hover ${InlineContextButton} {
        visibility: visible;
    }
`;
export const ListContainer = styled.ul`
    padding-left: 2rem;
    position: relative;
`;
export const CoveringLine = styled.div`
    top: .5rem;
    left: 4.2rem;
    position: absolute;
    width: .1rem;
    height: 100%;
    background: lightgrey;
`;


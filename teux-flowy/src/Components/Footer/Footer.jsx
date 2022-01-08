import styled from "styled-components";
import { PALLETE } from "../../Colors/colors";

const StyledFooter = styled.div`
    background: transparent;
    display: flex;
    padding: 2rem;
    justify-content: center;
    color: ${PALLETE.grey};
`

export const Footer = () => {
    return <StyledFooter>
        by Radosław & Przemysław
    </StyledFooter>;
}
 
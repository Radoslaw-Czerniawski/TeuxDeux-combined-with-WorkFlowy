import styled from "styled-components";
import { PALLETE } from "../../Colors/colors";

const StyledFooter = styled.div`
    background:${PALLETE.white};
    display: flex;
    padding: 2rem;
    justify-content: center;
    color: ${PALLETE.secondary};
    box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 40%);
    z-index: 1;
`

export const Footer = () => {
    return <StyledFooter>
        by Radosław & Przemysław
    </StyledFooter>;
}

import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    justify-content: center;
`

const BreadcrumbsContainer = styled.ul`
    display: flex;
`

const BreadcrumbElement = styled.li`
    padding: 10px;
`

const NodeUrlLink = styled.a`
    text-decoration: none;
    color: inherit;
    font-weight: 700;
`

const BreadcrumbCurrentElement = styled.span`
    padding: 10px;
`

function Header({ idPath }) {

    const parentList = idPath.currentPath;
    const id = parentList[parentList.length - 1];

    console.log(parentList);

    return (

        <HeaderContainer>
            <BreadcrumbsContainer>
                {parentList.map((parent, index) => {
                    const nodeUrl = "/" + parentList.slice(0, index+1).join(":");
                    console.log(nodeUrl);
                    return (
                        <>

                        { (index !== (parentList.length - 1) ) &&
                        <>
                        <BreadcrumbElement>

                            <NodeUrlLink href={nodeUrl}>{parent}</NodeUrlLink>
                        </BreadcrumbElement>
                        <BreadcrumbElement role="img" aria-label="Play Button">&#9654;&#65039;</BreadcrumbElement>
                        </>}
                        </>
                    )
                })}
                <BreadcrumbCurrentElement>{id}</BreadcrumbCurrentElement>
            </BreadcrumbsContainer>

        </ HeaderContainer>
    );
}

export { Header };

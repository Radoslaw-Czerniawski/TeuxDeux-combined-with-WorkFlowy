import { ListItem } from "../Components/List/ListItem";

const HomeView= ({setCurrentPath}) => {

    return (
        <ul>
            <ListItem id={"HOME"} parentList={[]} />
        </ul>
    );
}

export { HomeView };

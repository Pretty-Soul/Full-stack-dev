import { useContext } from "react";
import Contexttheme from "./ContextTheme";

function Childcomponent() {
    const { theme, setthemestate } = useContext(Contexttheme);
    return (
        <> <h1 >Hello world {theme}</h1>
        </>
    );
}

export default Childcomponent;

import { ReactNode } from "react";
import GlobalStyle from "../../../styles/GlobalStyles";
import Header from "../Header";

interface Props {
    children: ReactNode;
}

export default function PageTemplate({children}:Props){
    return(
        <>
            <GlobalStyle />
            <Header />
            {children}
        </>
    );
}
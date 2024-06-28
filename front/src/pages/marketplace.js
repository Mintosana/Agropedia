import Header from "../components/header/header";
import ShopItems from "../components/marketPlace/shopItems/shopItems";
import FilterMenu from "../components/marketPlace/menu/filterMenu";
import { Box } from "@mui/material";
import './css/marketplace.css';
import TicketButton from "../components/ticketButton/ticketButton";

export default function Marketplace() {

    return (
        <>
            <Header></Header>
            <Box className="MarketplaceElementsContainer">
                <FilterMenu />
                <ShopItems />
            </Box>
            <TicketButton></TicketButton>
        </>
    )
}
import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Map from "../../components/Map";
import detailsStyle from "../../styles/Details.module.css";
import ad from "../../images/ad-example.jpg";
import InformationService from "../../services/InformationService";
import ElementInformation from "../../interfaces/ElementInformation";
import InformationCard from "../../components/InformationCard";
import TableCard from "../../components/TableCard";
import { useTranslation, withTranslation } from "react-i18next";
import Toolbar from "../../components/Toolbar";

const Details: NextPage = () => {
    const [information, setInformation] = useState<ElementInformation>();
    const { t } = useTranslation();
    const router = useRouter();
    let { id } = router.query;

    let routeId: string = "";
    if (id != undefined) {
        if (id.length > 0)
            routeId = [id, ""].join();
    }

    useEffect(() => {
        if (routeId != '')
            InformationService.getInformationForItem(routeId).then(info => {
                setInformation(info);
            })
    }, []);

    if (routeId != '' && (information == undefined || information == null)) {
        InformationService.getInformationForItem(routeId).then(info => {
            setInformation(info);
        })
    }
    return (
        <>
            <Flex
                flexDirection={'column'}
                width={'100%'}
                className={detailsStyle.container}
            >
                <Toolbar />
                <Flex
                    height={'20vh'}
                    width={'100vw'}
                    className={detailsStyle['title-container']}
                >
                    <Flex
                        className={detailsStyle['heading-text']}
                        width={'100%'}
                    >{information?.Name}</Flex>
                </Flex>
                <Flex
                    flexDirection={'column'}
                    width={'100%'}
                    className={detailsStyle['information-container']}
                >
                    <Flex
                        flexDirection={'row'}
                        className={`${detailsStyle['responsive']}`}
                    >
                        <Flex
                            flexDirection={'column'}
                            className={detailsStyle['information-card']}
                            width={'300px'}
                            height={'315px'}
                        >
                            <InformationCard title={t("kontakt-informacije")} information={information} />
                        </Flex>
                        <br />
                        <Flex
                            flexDirection={'column'}
                            className={detailsStyle['information-card']}
                            width={'300px'}
                            height={'315px'}
                        >
                            <TableCard title={t("radno-vrijeme")} worktime={information?.worktime} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    height={'100vh'}
                    width={'100%'}>
                    <Map lat={information?.Latitude} long={information?.Longitude} />
                </Flex>
            </Flex>
        </>
    );
}

export default withTranslation()(Details);
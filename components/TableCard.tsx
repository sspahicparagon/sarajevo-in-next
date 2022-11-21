import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import WorkTime from "../interfaces/WorkTime"
import tableStyle from "../styles/Table.module.css";

interface TableConfig {
    title?: string;
    worktime?: WorkTime[];
}

export default function TableCard({ title, worktime }: TableConfig) {
    const { t } = useTranslation();
    let days: { [details: string]: string } = {
        "0": t("ponedjeljak"),
        "1": t("utorak"),
        "2": t("srijeda"),
        "3": t("cetvrtak"),
        "4": t("petak"),
        "5": t("subota"),
        "6": t("nedjelja")
    };

    return (
        <Flex
            flexDirection={'column'}
        >
            <Box
                className={tableStyle['table-title']}
            >
                <span><b>{title}</b></span>
            </Box>
            <hr />
            <Flex
                flexDirection={'column'}
                width={'100%'}
                className={tableStyle.container}
            >
                {worktime?.map((wt: WorkTime) => {
                    let open: string = wt.OpenTime.substring(11, 16) == '00:00' && wt.CloseTime.substring(11, 16) == '00:00' ? "-" : wt.OpenTime.substring(11, 16);
                    let close: string = wt.OpenTime.substring(11, 16) == '00:00' && wt.CloseTime.substring(11, 16) == '00:00' ? "-" : wt.CloseTime.substring(11, 16);
                    return (
                        <Flex
                            flexDirection={'row'}
                            className={tableStyle['table-row']}
                            key={Math.random()}
                        >
                            <Flex
                                flexDirection={'column'}
                                width={'60%'}
                                className={tableStyle['table-cell-day']}
                            >
                                <span>{days[wt.DayOfWeek ? wt.DayOfWeek + "" : "0"]}</span>
                            </Flex>
                            <Flex
                                flexDirection={"column"}
                                width={'40%'}
                            >
                                <Flex
                                    flexDirection={"row"}
                                >
                                    <Flex
                                        flexDirection={'column'}
                                        width={'50%'}
                                    >
                                        <>
                                            <span>{open}</span>
                                        </>
                                    </Flex>
                                    <Flex
                                        flexDirection={'column'}
                                        width={'50%'}
                                    >
                                        <span>{close}</span>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    );
}
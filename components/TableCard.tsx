import { Box, Flex } from "@chakra-ui/react";
import { worktime } from "@prisma/client";
import { useTranslation } from "next-i18next";
import tableStyle from "../styles/Table.module.css";

interface TableConfig {
    title?: string;
    worktime?: worktime[];
}

export default function TableCard({ title, worktime }: TableConfig) {
    const { t } = useTranslation('common');
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
                {worktime?.map((wt: worktime) => {
                    const oHours = wt.OpenTime.getUTCHours();
                    const oMinutes = wt.OpenTime.getUTCMinutes();
                    const cHours = wt.CloseTime.getUTCHours();
                    const cMinutes = wt.CloseTime.getUTCMinutes();

                    let open: string = `${oHours}:${oMinutes != 0 ? oMinutes : "00"}`;
                    let close: string = `${cHours}:${cMinutes != 0 ? cMinutes : "00"}`;
                    if (oHours == cHours && oHours == 0) {
                        open = '-';
                        close = '-';
                    }

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
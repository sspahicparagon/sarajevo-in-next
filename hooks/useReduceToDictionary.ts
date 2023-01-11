import useDisplayItemsCount from "./useDisplayItemsCount";

function useReduceToDictionary(values: { [key: string]: any }, itemCount?: number | undefined) {
    let displayItemsCount: number = itemCount ?? useDisplayItemsCount();

    let dictionary = Object.entries(values).reduce((rows: any[], key: any, index: number) => {
        return (index % displayItemsCount == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
    }, []);

    return dictionary;
}

export default useReduceToDictionary;
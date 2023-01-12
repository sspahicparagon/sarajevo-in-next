import { useEffect, useState } from "react";

function debounce(fn: Function, ms: number) {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    }
};

function determineDisplayItemsCount() {
    if (typeof window === "undefined") return 6;
    const windowWidth: number = window.innerWidth;

    if (windowWidth <= 600) return 2;
    else if (windowWidth <= 900) return 3;
    else if (windowWidth <= 1200) return 4;
    else if (windowWidth <= 1400) return 5;

    return 6;
};

function useDisplayItemsCount() {

    const [displayItemsCount, setDisplayItemsCount] = useState<number>(determineDisplayItemsCount());

    useEffect(() => {
        const debounceHandleResize = debounce(
            function handleResize() {
                let count: number = determineDisplayItemsCount();
                if (count != displayItemsCount)
                    setDisplayItemsCount(count);
            }, 250);
        window.addEventListener('resize', debounceHandleResize)

        return () => {
            window.removeEventListener('resize', debounceHandleResize)
        }
    }, []);

    return displayItemsCount;
}

export default useDisplayItemsCount;
import { useEffect, useState } from "react";
import { jobItems } from "./types";

export function useJobItems(searchText: string) {
    const [jobItems, setJobItems] = useState<jobItems[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const jobItemsSliced = jobItems.slice(0, 7)

    useEffect(() => {
        if (!searchText) return;

        const fetchJobItems = async () => {
            setIsLoading(true);
            const response = await fetch(
                `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
            );
            const data = await response.json();
            setIsLoading(false);
            setJobItems(data.jobItems);
        };

        fetchJobItems();
    }, [searchText]);

    return [
        jobItemsSliced, isLoading
    ] as const
}

export function useActiveId() {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const id = +window.location.hash.slice(1);
            setActiveId(id);
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return activeId
}
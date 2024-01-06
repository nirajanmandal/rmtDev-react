import { useEffect, useState } from "react";
import { jobItemExtended, jobItems } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

type JobItemApiResponse = {
    public: boolean,
    jobItem: jobItemExtended
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
    const response = await fetch(`${BASE_API_URL}/${id}`)
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.description)
    }
    const data = await response.json()
    return data
}

export function useJobItem(id: number | null) {
    const { data, isInitialLoading } = useQuery(
        ['job-item', id],
        () => id ? fetchJobItem(id) : null,
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(id),
            onError: (e) => {
                console.log(e)
            }
        }
    )

    const jobItem = data?.jobItem
    const isLoading = isInitialLoading || null
    return { jobItem, isLoading } as const
}

type JobItemsApiResponse = {
    public: boolean,
    sorted: boolean,
    jobItems: jobItems[]
}

const fetchJobItems = async (searchText: string): Promise<JobItemsApiResponse> => {
    const response = await fetch(`${BASE_API_URL}?search=${searchText}`)
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.description)
    }
    const data = await response.json()
    return data
}

export function useJobItems(searchText: string) {
    const { data, isInitialLoading } = useQuery(
        ['job-items', searchText],
        () => searchText ? fetchJobItems(searchText) : null,
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(searchText),
            onError: (e) => {
                console.log(e)
            }
        }
    )

    return {
        jobItems: data?.jobItems, isLoading: isInitialLoading
    } as const
}

export function useDebounce<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
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

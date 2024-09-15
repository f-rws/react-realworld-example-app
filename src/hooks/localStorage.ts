export const LOCAL_STORAGE_KEYS = {
    JWT_TOKEN: "JWTToken",
} as const;

type LocalStorageValues = {
    [LOCAL_STORAGE_KEYS.JWT_TOKEN]: string;
};

export const useLocalStorage = () => {
    const set = <K extends keyof LocalStorageValues>(key: K, value: LocalStorageValues[K]) =>
        localStorage.setItem(key, value);

    const getItem = <K extends keyof LocalStorageValues>(key: K): LocalStorageValues[K] | null => {
        return localStorage.getItem(key);
    };

    return {
        set,
        getItem,
    };
};

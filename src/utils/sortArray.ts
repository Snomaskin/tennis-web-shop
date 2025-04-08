interface CompareValues<T> {
    objectA: T;
    objectB: T;
    fields: { field: keyof T, direction?: 'asc' | 'dsc' }[];
    options?: { locale?: string };
};
function compareValues<T>(params: CompareValues<T>): number {
    const { objectA, objectB, fields, options = { locale: 'en' } } = params;
    for (const {field, direction = 'asc'} of fields) {
        const valueA = objectA[field];
        const valueB = objectB[field];

        let compareResult: number;
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          compareResult = valueA.localeCompare(valueB, options.locale)
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          compareResult = valueA - valueB;
        } else {
          compareResult = String(valueA).localeCompare(String(valueB), options.locale)
        }
        if (compareResult !== 0) {
          return direction === 'asc' ? compareResult : -compareResult;
        }
}
return 0;
}

interface CustomSort<T> {
    arr: T[];
    fields: { field: keyof Partial<T>, direction?: 'asc' | 'dsc' }[];
    options?: { locale?: string }; 
}
export default function customSort<T>({ arr, fields, options = { locale: 'en' } }: CustomSort<T>): T[] {
    return [...arr].sort((a, b) => {
        return compareValues({objectA: a, objectB: b, fields, options});
        });
}
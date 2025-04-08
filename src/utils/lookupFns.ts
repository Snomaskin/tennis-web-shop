interface LookupFns<T> {
    lookupEntry: (arr: T[], entryDetails: Partial<T>) => T | undefined;
    filterBy: (arr: T[], criteria: Partial<T>) => T[];
};

export default function createLookupFns<T>():LookupFns<T> {
    return {
      lookupEntry(arr, entryDetails) {
        return arr.find(i => {
            return Object.entries(entryDetails).every(
              ([key, value]) => i[key as keyof T] === value
            );
        });
      },
  
      filterBy(arr, criteria) {
          return arr.filter(i => {
              return Object.entries(criteria).every(
                ([key, value]) => i[key as keyof T] === value
              );
          });
      }
    };
  }
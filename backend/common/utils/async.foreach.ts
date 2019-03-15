// tslint:disable no-any
type AnyFunction = (...args: any[]) => any;

export async function asyncForEach<T>(array: T[], callback: AnyFunction) {
    for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array);
    }
}

export class ListUtil {
  static array_move<T>(arr: T[], oldIndex: number, newIndex: number): T[] {
    const array = [...arr];
    if (newIndex >= array.length) {
      let k = newIndex - array.length + 1;
      while (k--) {
        array.push(null as T);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }
}

import { TUseStorage } from '@/types/hooks/Storage';

/**
 * @description Storage Hook
 * TODO: Switch with storage-manager
 * @author Luca Cattide
 * @returns {*}  {TUseStorage}
 */
const useStorage = (): TUseStorage => {
  /**
   * @description Storage removal
   * Deletes an item from the Local Storage
   * @author Luca Cattide
   * @param {Array<string>} items
   */
  const deleteStorages = (items: Array<string>): void => {
    // Local Storage check
    if (window.localStorage) {
      items.forEach((item) => {
        localStorage.removeItem(item);
      });
    }
  };

  /**
   * @description Storage getter
   * Retrieves an item from Local Storage if present
   * @author Luca Cattide
   * @param {string} item
   * @returns {*}  {(string | null)}
   */
  const getStorage = (item: string): string | null => {
    let element = null;

    // Local Storage check
    if (window.localStorage) {
      element = localStorage.getItem(item);
    }

    return element;
  };

  /**
   * @description Storage setter
   * Saves an item to the Local Storage
   * @author Luca Cattide
   * @param {string} item
   * @param {string} value
   */
  const setStorage = (item: string, value: string): void => {
    // Local Storage & consent check
    if (window.localStorage) {
      localStorage.setItem(item, value);
    }
  };

  return { deleteStorages, getStorage, setStorage };
};

export default useStorage;

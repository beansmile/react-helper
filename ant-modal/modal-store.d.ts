import { StoreHelper } from 'mobx-multiple-store';
export default class ModalStore extends StoreHelper {
    static get(key?: string): ModalStore;
    static showModal(key: any): void;
    static hideModal(key: any): void;
    onOk: Function;
    onCancel: Function;
    visible: boolean;
    confirmLoading: boolean;
    showModal(): void;
    hideModal(): void;
}

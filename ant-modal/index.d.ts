import * as React from 'react';
import { ModalProps } from 'antd/lib/modal/Modal';
import { DrawerProps } from 'antd/lib/drawer';
import ModalStore from './modal-store';
export default class CModal extends React.Component {
    static defaultProps: {
        destroyOnClose: boolean;
        onOk: () => any;
        onCancel: () => any;
        onClose: () => any;
    };
    static keyCode: any;
    props: ModalProps & DrawerProps & {
        trigger: React.ReactElement<any> | ((modalStore: ModalStore) => React.ReactNode) | any;
        modalStore?: ModalStore;
        children?: any;
        render?: (modalStore: ModalStore) => any;
        useDrawer?: boolean;
    };
    modalStore: ModalStore;
    getStore(): ModalStore;
    onOk(event: any): IterableIterator<void>;
    showModal(e: any): void;
    onCancel(e: any): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

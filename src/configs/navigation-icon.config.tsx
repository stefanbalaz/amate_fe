import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineTable,
    HiOutlineViewGridAdd,
    HiOutlineZoomIn,
    HiOutlineHome,
    HiOutlineDocumentAdd,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    /*     singleMenu: <HiOutlineViewGridAdd />, */
    singleMenu: <HiOutlineTable />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    createOrder: <HiOutlineDocumentAdd />,
}

export default navigationIcon

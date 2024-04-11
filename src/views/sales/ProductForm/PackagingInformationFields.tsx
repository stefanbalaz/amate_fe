import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import DatePicker from '@/components/ui/DatePicker'
import { useEffect, useState } from 'react'
import { HiOutlineCalendar } from 'react-icons/hi'
import React from 'react'
import Select from '@/components/ui/Select'
import {
    orderStatusMap,
    productVolumeMap,
    transportMediumMap,
    containerMediumMap,
    unitsPerTransportMediumMap,
} from '@/configs/order.overview/orderStringMapper'
import AsyncSelect from 'react-select/async'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import { useAppSelector } from '@/store'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    orderNumber: string
    orderPartner: string
    orderStatus: string
    orderCreationDate: Date
    name: string
    productCode: string
    description: string
}

type ProductVolumeFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        productVolume: Number
        tags: Options
        [key: string]: unknown
    }
}

type PackagingInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        transportMedium: string
        tags: Options
        [key: string]: unknown
    }
    onFieldChange: (fieldName: string, value: any) => void
}

const { Addon } = InputGroup

const PackagingInformationFields = (props: PackagingInformationFields) => {
    const { touched, errors, onFieldChange } = props

    const [productVolume, setProductVolume] = useState<number | null>(0.33)

    const [transportMedium, setTransportMedium] = useState<string | null>(
        'Crate'
    )

    const [containerMedium, setContainerMedium] = useState<string | null>(
        'Glass'
    )

    const [unitsPerTransportMedium, setUnitsPerTransportMedium] = useState<
        number | null
    >(20)

    const [transportMediumIssuanceAmount, setTransportMediumIssuanceAmount] =
        useState<number>(0)

    const [containerMediumReceiptAmount, setContainerMediumReceiptAmount] =
        useState<number>(0)

    const [palletIssuanceAmount, setPalletIssuanceAmount] = useState<number>(0)

    const [transportMediumReceiptAmount, setTransportMediumReceiptAmount] =
        useState<number>(0)

    const [palletReceiptAmount, setPalletReceiptAmount] = useState<number>(0)

    const [allProductsTotal, setAllProductsTotal] = useState<number>(0)

    const productAmounts = useAppSelector((state) => state.product)

    //    console.log('productAmountsPackaging', productAmounts)

    useEffect(() => {
        const calculateAllProductsTotal = () => {
            if (productAmounts && typeof productAmounts === 'object') {
                const allProductsTotal = Object.values(productAmounts).reduce(
                    (total, amount) => total + amount,
                    0
                )
                console.log('productAmountsSum', allProductsTotal)
                setAllProductsTotal(allProductsTotal)
            } else {
                console.error(
                    'productAmountsSum is not an object or is undefined'
                )
                return 0
            }
        }

        calculateAllProductsTotal()
    }, [productAmounts])

    //   console.log('allProductsTotal', allProductsTotal)

    useEffect(() => {
        const calculateTransportMediumAmount = () => {
            const dynamicTransportMediumAmountCalculation =
                allProductsTotal / unitsPerTransportMedium

            const roundedAmount = Math.ceil(
                dynamicTransportMediumAmountCalculation
            )

            setTransportMediumIssuanceAmount(roundedAmount)
        }

        calculateTransportMediumAmount()
    }, [allProductsTotal, transportMedium, unitsPerTransportMedium])

    const onClickHandler = (
        setFieldAmount: React.Dispatch<React.SetStateAction<number>>,
        amount: number,
        fieldName: string,
        fieldValue: number, // Value of the field
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const newValue = Math.max(fieldValue + amount, 0)
        setFieldAmount(newValue)
        handleFieldChange(fieldName, newValue)
    }

    const handleFieldChange = (fieldName: string, value: any) => {
        onFieldChange(fieldName, value)
    }

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">Packaging</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                <div className="col-span-1">
                    <FormItem
                        label="Volume"
                        invalid={
                            (errors.productVolume &&
                                touched.productVolume) as boolean
                        }
                        errorMessage={errors.productVolume}
                    >
                        <InputGroup>
                            <Addon className="input-addon-unit">Liter</Addon>
                            <Select
                                className="input-group-unit"
                                placeholder="Product Volume"
                                options={Object.keys(productVolumeMap).map(
                                    (key) => ({
                                        label: productVolumeMap[key]
                                            .productVolumeKey,
                                        value: key,
                                    })
                                )}
                                onChange={(selectedOption) => {
                                    const { value, label } = selectedOption
                                    handleFieldChange('productVolume', {
                                        value,
                                        label,
                                    })
                                }}
                                defaultValue={{
                                    label: '0.33',
                                    value: '0.33',
                                }}
                            />
                        </InputGroup>
                    </FormItem>
                    <FormItem
                        label="Transport Medium"
                        invalid={
                            (errors.transportMedium &&
                                touched.transportMedium) as boolean
                        }
                        errorMessage={errors.transportMedium}
                    >
                        <Select
                            placeholder="Transport Medium"
                            options={Object.keys(transportMediumMap).map(
                                (key) => ({
                                    label: transportMediumMap[key]
                                        .transportMediumKey,
                                    value: key,
                                })
                            )}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('transportMedium', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: 'Crate',
                                value: 'Crate',
                            }}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Container Medium"
                        invalid={
                            (errors.containerMedium &&
                                touched.containerMedium) as boolean
                        }
                        errorMessage={errors.containerMedium}
                    >
                        <Select
                            placeholder="Container Medium"
                            options={Object.keys(containerMediumMap).map(
                                (key) => ({
                                    label: containerMediumMap[key]
                                        .containerMediumKey,
                                    value: key,
                                })
                            )}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('containerMedium', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: 'Glass',
                                value: 'Plastic',
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label="Units Per Transport Medium"
                        invalid={
                            (errors.unitsPerTransportMedium &&
                                touched.unitsPerTransportMedium) as boolean
                        }
                        errorMessage={errors.unitsPerTransportMedium}
                    >
                        <Select
                            placeholder="Units Per Transport Medium"
                            options={Object.keys(
                                unitsPerTransportMediumMap
                            ).map((key) => ({
                                label: unitsPerTransportMediumMap[key]
                                    .unitsPerTransportMediumKey,
                                value: key,
                            }))}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('unitsPerTransportMedium', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: '20',
                                value: '20',
                            }}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 2xl:grid-cols-2 gap-x-4 gap-y-0">
                {/* Container Medium Receipt Amount */}

                <FormItem
                    label="Container Medium Receipt Amount"
                    invalid={
                        (errors.containerMediumReceiptAmount &&
                            touched.containerMediumReceiptAmount) as boolean
                    }
                    errorMessage={errors.containerMediumReceiptAmount}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setContainerMediumReceiptAmount,
                                    -10,
                                    'containerMediumReceiptAmount',
                                    containerMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            - 10
                        </Button>

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setContainerMediumReceiptAmount,
                                    -1,
                                    'containerMediumReceiptAmount',
                                    containerMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>
                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input"
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={containerMediumReceiptAmount}
                            /*  onChange={(e) =>
                                setContainerMediumReceiptAmount(
                                    Number(e.target.value)
                                )
                            } */
                            onChange={(e) => {
                                handleFieldChange(
                                    'containerMediumReceiptAmount',
                                    Number(e.target.value)
                                )
                                setContainerMediumReceiptAmount(
                                    Number(e.target.value)
                                )
                            }}
                        />

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setContainerMediumReceiptAmount,
                                    1,
                                    'containerMediumReceiptAmount',
                                    containerMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setContainerMediumReceiptAmount,
                                    10,
                                    'containerMediumReceiptAmount',
                                    containerMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            + 10
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* Transport Medium Issuance Amount */}

                <FormItem
                    label="Transport Medium Issuance Amount"
                    invalid={
                        (errors.transportMediumIssuanceAmount &&
                            touched.transportMediumIssuanceAmount) as boolean
                    }
                    errorMessage={errors.transportMediumIssuanceAmount}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*   color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumIssuanceAmount,
                                    -10,
                                    'transportMediumIssuanceAmount',
                                    transportMediumIssuanceAmount,
                                    e
                                )
                            }
                        >
                            - 10
                        </Button>

                        <Button
                            className="custom-group-button"
                            /*      variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumIssuanceAmount,
                                    -1,
                                    'transportMediumIssuanceAmount',
                                    transportMediumIssuanceAmount,
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>
                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input "
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={transportMediumIssuanceAmount}
                            onChange={(e) => {
                                handleFieldChange(
                                    'transportMediumIssuanceAmount',
                                    Number(e.target.value)
                                )
                                setTransportMediumIssuanceAmount(
                                    Number(e.target.value)
                                )
                            }}
                        />

                        <Button
                            className="custom-group-button"
                            /*         variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumIssuanceAmount,
                                    1,
                                    'transportMediumIssuanceAmount',
                                    transportMediumIssuanceAmount,
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*    color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumIssuanceAmount,
                                    10,
                                    'transportMediumIssuanceAmount',
                                    transportMediumIssuanceAmount,
                                    e
                                )
                            }
                        >
                            + 10
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* Transport Medium Receipt Amount */}

                <FormItem
                    label="Transport Medium Receipt Amount"
                    invalid={
                        (errors.transportMediumReceiptAmount &&
                            touched.transportMediumReceiptAmount) as boolean
                    }
                    errorMessage={errors.transportMediumReceiptAmount}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumReceiptAmount,
                                    -10,
                                    'transportMediumReceiptAmount',
                                    transportMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            - 10
                        </Button>

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumReceiptAmount,
                                    -1,
                                    'transportMediumReceiptAmount',
                                    transportMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>
                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input"
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={transportMediumReceiptAmount}
                            onChange={(e) => {
                                handleFieldChange(
                                    'transportMediumReceiptAmount',
                                    Number(e.target.value)
                                )
                                setTransportMediumReceiptAmount(
                                    Number(e.target.value)
                                )
                            }}
                        />

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumReceiptAmount,
                                    1,
                                    'transportMediumReceiptAmount',
                                    transportMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setTransportMediumReceiptAmount,
                                    10,
                                    'transportMediumReceiptAmount',
                                    transportMediumReceiptAmount,
                                    e
                                )
                            }
                        >
                            + 10
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* Pallet Issuance Amount */}

                <FormItem
                    label="Pallet Issuance Amount"
                    invalid={
                        (errors.palletIssuanceAmount &&
                            touched.palletIssuanceAmount) as boolean
                    }
                    errorMessage={errors.palletIssuanceAmount}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletIssuanceAmount,
                                    -10,
                                    'palletIssuanceAmount',
                                    palletIssuanceAmount,
                                    e
                                )
                            }
                        >
                            - 10
                        </Button>

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletIssuanceAmount,
                                    -1,
                                    'palletIssuanceAmount',
                                    palletIssuanceAmount,
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>
                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input"
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={palletIssuanceAmount}
                            onChange={(e) => {
                                handleFieldChange(
                                    'palletIssuanceAmount',
                                    Number(e.target.value)
                                )
                                setPalletIssuanceAmount(Number(e.target.value))
                            }}
                        />

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletIssuanceAmount,
                                    1,
                                    'palletIssuanceAmount',
                                    palletIssuanceAmount,
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletIssuanceAmount,
                                    10,
                                    'palletIssuanceAmount',
                                    palletIssuanceAmount,
                                    e
                                )
                            }
                        >
                            + 10
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* Pallet Receipt Amount */}

                <FormItem
                    label="Pallet Receipt Amount"
                    invalid={
                        (errors.palletReceiptAmount &&
                            touched.palletReceiptAmount) as boolean
                    }
                    errorMessage={errors.palletReceiptAmount}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletReceiptAmount,
                                    -10,
                                    'palletReceiptAmount',
                                    palletReceiptAmount,
                                    e
                                )
                            }
                        >
                            - 10
                        </Button>

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletReceiptAmount,
                                    -1,
                                    'palletReceiptAmount',
                                    palletReceiptAmount,
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>
                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input"
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={palletReceiptAmount}
                            onChange={(e) => {
                                handleFieldChange(
                                    'palletReceiptAmount',
                                    Number(e.target.value)
                                )
                                setPalletReceiptAmount(Number(e.target.value))
                            }}
                        />

                        <Button
                            className="custom-group-button"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletReceiptAmount,
                                    1,
                                    'palletReceiptAmount',
                                    palletReceiptAmount,
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            onClick={(e) =>
                                onClickHandler(
                                    setPalletReceiptAmount,
                                    10,
                                    'palletReceiptAmount',
                                    palletReceiptAmount,
                                    e
                                )
                            }
                        >
                            + 10
                        </Button>
                    </InputGroup>
                </FormItem>
            </div>
        </AdaptableCard>
    )
}

export default PackagingInformationFields

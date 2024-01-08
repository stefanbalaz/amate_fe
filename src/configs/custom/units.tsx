import { NumericFormat } from 'react-number-format'

export const Amount = ({ amount = 0 }: { amount?: number }) => {
    return (
        <NumericFormat
            displayType="text"
            value={Math.round(amount).toFixed(0)}
            suffix={'Pcs'}
            thousandSeparator={true}
        />
    )
}

export const PriceAmount = ({ amount = 0 }: { amount?: number }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            suffix={'€'}
            thousandSeparator={true}
        />
    )
}

export const VatAmount = ({ amount = 0 }: { amount?: number }) => {
    return (
        <NumericFormat
            displayType="text"
            value={Math.round(amount * 100).toFixed(0)}
            suffix={'%'}
            thousandSeparator={true}
        />
    )
}

import s from './card.module.scss'
import {ComponentPropsWithoutRef, ElementType} from "react";

export type CardProps<T extends ElementType = 'div'> = {
    as?: T
    className?: string
    fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>(
    props: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>
) => {
    const { as: Component = 'div', className, fullWidth, ...rest } = props

    return <Component className={`${s.card} ${className}`} {...rest} />
}

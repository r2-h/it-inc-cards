import {Typography} from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'
import {useState} from "react";
import UpImg from "@/assets/up-img";
import DownImg from "@/assets/down-img";
import DownDisabledImg from "@/assets/down-disabled-img";

export type Options = {
    id: string
    value: string
}

type SelectDemoProps = {
    className?: string
    label: string
    options: Options[]
    placeholder: string
    disabled?: boolean
}

export const SelectDemo = ({label, options, placeholder, disabled = false}: SelectDemoProps) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleValueChange = (value: string | undefined) => {
        setSelectedValue(value)
    }
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    }

    return (
        <div className={s.root}>
            <Typography className={s.selectLabel} variant={'body2'}>
                {label}
            </Typography>
            <Select.Root disabled={disabled} defaultValue={selectedValue} onValueChange={handleValueChange}
                         onOpenChange={handleOpenChange}>
                <Select.Trigger className={s.trigger}>
                    <Select.Value placeholder={placeholder}/>
                    <Typography className={s.text} variant={'body1'}>{selectedValue}</Typography>
                    <Select.Icon className={s.icon}>
                        {isOpen ? <UpImg/> : disabled ? <DownDisabledImg/> : <DownImg/>}
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Viewport className={s.viewport}>
                            {options.map(option => (
                                <Select.Item className={s.item} key={option.id}
                                             value={option.value}>
                                    <Typography className={s.text} variant={'body1'}>{option.value}</Typography>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}

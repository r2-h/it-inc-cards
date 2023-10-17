import {FC} from 'react'
import CheckboxImg from '@/assets/checkboxImg'
import CheckboxDoneImg from '@/assets/checkboxDone'
import {Typography} from '@/components/ui/typography'

import * as Checkbox from '@radix-ui/react-checkbox'

import s from './check-box.module.scss'

type CheckboxDemoProps = {
    label?: string
    disabled?: boolean
}

export const CheckboxDemo: FC<CheckboxDemoProps> = ({disabled = false, label = ''}) => {
    return (
        <div className={s.wrapper}>
            <Checkbox.Root disabled={disabled} className={s.root}>
                <CheckboxImg className={s.icon}/>
                <Checkbox.Indicator>
                    <CheckboxDoneImg className={s.icon}/>
                </Checkbox.Indicator>
            </Checkbox.Root>

            {label &&
                <Typography className={disabled ? `${s.checkboxLabel} ${s.checkboxLabelDisabled}` : s.checkboxLabel}
                            variant={'body2'}>{label}</Typography>}
        </div>
    )
}

import { FC } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Tabs from '@radix-ui/react-tabs'

import s from './tab.module.scss'

type TabProps = {
  defaultValue?: string
  disabled?: boolean
  label?: string
  onChange?: (value: string) => void
  tabs: TabsType[]
  value?: string
}
export type TabsType = {
  title: string
  value: string
}

export const Tab: FC<TabProps> = ({
  defaultValue = 'tab1',
  disabled,
  label,
  onChange,
  tabs,
  value,
}) => (
  <Tabs.Root
    className={s.tabsRoot}
    defaultValue={defaultValue}
    onValueChange={onChange}
    value={value}
  >
    {label && (
      <Typography as={'label'} className={s.label} variant={'body2'}>
        {label}
      </Typography>
    )}
    <Tabs.List className={s.tabsList}>
      {tabs.map(tab => (
        <Tabs.Trigger
          className={s.tabsTrigger}
          disabled={disabled}
          key={tab.value}
          value={tab.value}
        >
          <Typography className={s.title} variant={'body1'}>
            {tab.title}
          </Typography>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  </Tabs.Root>
)

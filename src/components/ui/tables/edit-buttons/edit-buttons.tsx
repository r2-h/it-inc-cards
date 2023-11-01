import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'

import s from './edit-buttons.module.scss'
export const EditButtons = () => {
  return (
    <div className={s.wrapper}>
      <button>
        <PlayCircleImg />
      </button>
      <button>
        <EditImg />
      </button>
      <button>
        <TrashImg />
      </button>
    </div>
  )
}

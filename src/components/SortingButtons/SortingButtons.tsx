import { Sorting } from '../../model/types';
import style from './SortingButtons.module.css'

const SortingButtons = ( { field, handler, active } : { field: string, handler: (s: Sorting) => void, active?: string }) => {
   return <div className={style.controls}>
      <button
         className={`${style.arrow} ${active === 'asc' ? style.active:''}`}
         onClick={() => handler({ field, order: 'asc' })}
      >
         &uarr;
      </button>
      <button
         className={`${style.arrow} ${active === 'desc' ? style.active:''}`}
         onClick={() => handler({ field, order: 'desc' })}
      >
         &darr;
      </button>
   </div>
}

export default SortingButtons;
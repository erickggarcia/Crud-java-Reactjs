import style from './Loading.module.css'
export function Loading() {
  return (
    <div className={style.loadingContainer}>
      <div className={style.loadingSpinner}></div>
    </div>
  )
}
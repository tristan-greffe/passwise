import { forwardRef, useImperativeHandle } from 'react'

const ProfilManager = forwardRef((props, ref) => {
  const apply = () => {
    console.log('apply profil manager')
  }
  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))
  return (
    <>
          <div>toto</div>
    </>
  )
})

export default ProfilManager
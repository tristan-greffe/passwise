import { forwardRef, useImperativeHandle } from 'react'

const DeleteAccountManager = forwardRef((props, ref) => {
  const apply = () => {
    console.log('apply')
  }
  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))

  return (
    <>
      <div>toto</div>
    </>
  )
})

export default DeleteAccountManager
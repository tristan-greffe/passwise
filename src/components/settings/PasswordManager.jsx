import { forwardRef, useImperativeHandle } from 'react'

const PasswordManager = forwardRef((props, ref) => {
  const apply = () => {
    console.log('apply password')
  }
  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))
  
  return (
    <>
          <div>toto</div>
    </>
  )
})

export default PasswordManager
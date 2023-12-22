import { forwardRef, useImperativeHandle } from 'react'

const EmailManager = forwardRef((props, ref) => {

  const apply = () => {
    console.log('apply email manager')
  }
  
  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))
  return (
    <>toto
          <div>toto</div>
    </>
  )
})

export default EmailManager